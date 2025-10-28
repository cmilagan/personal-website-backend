# AWS Deployment Guide: Static Site on S3 with Lambda Visitor Counter

This guide walks you through deploying your Next.js portfolio as a static site on AWS S3 with a serverless visitor counter using Lambda + API Gateway + DynamoDB.

## Architecture Overview

```
┌─────────┐       ┌──────────┐       ┌────────────┐       ┌──────────┐
│   S3    │◄──────│CloudFront│       │ API Gateway│◄──────│  Lambda  │
│ (Static)│       │ (CDN)    │       │            │       │ Function │
└─────────┘       └──────────┘       └────────────┘       └─────┬────┘
                        │                   ▲                     │
                        │                   │                     │
                        │              Visitor Counter            │
                        │                 API Call                │
                        │                                         ▼
                        │                                  ┌──────────┐
                        └──────────────────────────────────► DynamoDB │
                                                           │  Table   │
                                                           └──────────┘
```

## Prerequisites

- AWS CLI installed and configured
- Node.js and npm installed
- AWS account with appropriate permissions

## Part 1: Set Up DynamoDB Table

### Option A: Using AWS Console

1. Go to AWS DynamoDB Console
2. Click "Create table"
3. Configure:
   - **Table name**: `visitor-counter`
   - **Partition key**: `id` (String)
   - Leave other settings as default or adjust based on your needs
4. Click "Create table"

### Option B: Using AWS CLI

```bash
aws dynamodb create-table \
  --table-name visitor-counter \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### Initialize the Counter

```bash
aws dynamodb put-item \
  --table-name visitor-counter \
  --item '{"id": {"S": "site-visitors"}, "count": {"N": "0"}}' \
  --region us-east-1
```

## Part 2: Deploy Lambda Function

### Step 1: Install Lambda Dependencies

```bash
cd lambda/visitor-counter
npm install
```

### Step 2: Create Deployment Package

```bash
# Create a zip file with the function code and dependencies
zip -r function.zip index.js node_modules/ package.json
```

### Step 3: Create IAM Role for Lambda

Create a file `lambda-trust-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Create the role:

```bash
aws iam create-role \
  --role-name visitor-counter-lambda-role \
  --assume-role-policy-document file://lambda-trust-policy.json
```

Attach necessary policies:

```bash
# Basic Lambda execution
aws iam attach-role-policy \
  --role-name visitor-counter-lambda-role \
  --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
```

Create DynamoDB access policy file `dynamodb-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:UpdateItem"
      ],
      "Resource": "arn:aws:dynamodb:us-east-1:*:table/visitor-counter"
    }
  ]
}
```

Create and attach the policy:

```bash
aws iam put-role-policy \
  --role-name visitor-counter-lambda-role \
  --policy-name DynamoDBAccess \
  --policy-document file://dynamodb-policy.json
```

### Step 4: Deploy Lambda Function

```bash
aws lambda create-function \
  --function-name visitor-counter \
  --runtime nodejs20.x \
  --role arn:aws:iam::YOUR_ACCOUNT_ID:role/visitor-counter-lambda-role \
  --handler index.handler \
  --zip-file fileb://function.zip \
  --environment Variables={DYNAMODB_TABLE_NAME=visitor-counter} \
  --region us-east-1
```

Replace `YOUR_ACCOUNT_ID` with your AWS account ID.

### Step 5: Update Lambda Function (for future updates)

```bash
# After making changes, re-create the zip and update:
zip -r function.zip index.js node_modules/ package.json

aws lambda update-function-code \
  --function-name visitor-counter \
  --zip-file fileb://function.zip \
  --region us-east-1
```

## Part 3: Set Up API Gateway

### Option A: Using AWS Console

1. Go to API Gateway Console
2. Click "Create API"
3. Choose "HTTP API" (simpler and cheaper than REST API)
4. Click "Build"
5. Configure:
   - **Integrations**: Add integration → Lambda → Select `visitor-counter` function
   - **API name**: `visitor-counter-api`
6. Configure routes:
   - **Route**: `ANY /visitor-count`
   - **Integration**: Select the Lambda function
7. Configure CORS:
   - **Access-Control-Allow-Origin**: `*` (or your specific domain)
   - **Access-Control-Allow-Methods**: `GET, POST, OPTIONS`
8. Create a stage named `prod`
9. Deploy

Your API Gateway URL will look like:
```
https://abc123xyz.execute-api.us-east-1.amazonaws.com/prod/visitor-count
```

### Option B: Using AWS CLI

```bash
# Create HTTP API
aws apigatewayv2 create-api \
  --name visitor-counter-api \
  --protocol-type HTTP \
  --target arn:aws:lambda:us-east-1:YOUR_ACCOUNT_ID:function:visitor-counter \
  --region us-east-1
```

Note the API ID from the output, then configure CORS and permissions as needed.

### Grant API Gateway Permission to Invoke Lambda

```bash
aws lambda add-permission \
  --function-name visitor-counter \
  --statement-id apigateway-invoke \
  --action lambda:InvokeFunction \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-1:YOUR_ACCOUNT_ID:YOUR_API_ID/*/*/visitor-count" \
  --region us-east-1
```

## Part 4: Build Static Site

### Step 1: Configure Environment Variable

Create `.env.local` file:

```bash
NEXT_PUBLIC_VISITOR_API_URL=https://YOUR_API_GATEWAY_URL/visitor-count
```

Replace with your actual API Gateway URL from Part 3.

### Step 2: Build the Static Site

```bash
# From the project root
npm run build
```

This creates an `out/` directory with your static files.

## Part 5: Deploy to S3

### Step 1: Create S3 Bucket

```bash
# Replace with your desired bucket name
aws s3 mb s3://your-portfolio-website --region us-east-1
```

### Step 2: Configure Bucket for Static Website Hosting

```bash
aws s3 website s3://your-portfolio-website \
  --index-document index.html \
  --error-document 404.html
```

### Step 3: Set Bucket Policy for Public Access

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-portfolio-website/*"
    }
  ]
}
```

Apply the policy:

```bash
aws s3api put-bucket-policy \
  --bucket your-portfolio-website \
  --policy file://bucket-policy.json
```

### Step 4: Upload Static Files

```bash
# From project root
aws s3 sync out/ s3://your-portfolio-website --delete
```

Your site is now live at:
```
http://your-portfolio-website.s3-website-us-east-1.amazonaws.com
```

## Part 6: Set Up CloudFront (Optional but Recommended)

CloudFront provides HTTPS, better performance, and custom domain support.

### Using AWS Console

1. Go to CloudFront Console
2. Click "Create Distribution"
3. Configure:
   - **Origin Domain**: Select your S3 bucket (use the website endpoint)
   - **Viewer Protocol Policy**: Redirect HTTP to HTTPS
   - **Allowed HTTP Methods**: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - **Cache Policy**: CachingOptimized
   - **Alternate Domain Names (CNAMEs)**: Your custom domain (optional)
   - **SSL Certificate**: Request/import certificate for custom domain (optional)
4. Create Distribution

### Update Your .env.local (if needed)

If you set up a custom domain with CloudFront, you may not need to change anything. The API Gateway URL should still work with CORS configured.

## Part 7: Continuous Deployment

### Manual Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash

echo "Building static site..."
npm run build

echo "Uploading to S3..."
aws s3 sync out/ s3://your-portfolio-website --delete

echo "Invalidating CloudFront cache (if using)..."
# Replace with your CloudFront distribution ID
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"

echo "Deployment complete!"
```

Make it executable:

```bash
chmod +x deploy.sh
```

Run deployment:

```bash
./deploy.sh
```

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automated deployments on push to main.

## Testing

### Test Lambda Function Directly

```bash
aws lambda invoke \
  --function-name visitor-counter \
  --payload '{"httpMethod":"GET"}' \
  --cli-binary-format raw-in-base64-out \
  response.json

cat response.json
```

### Test API Gateway

```bash
# Get count
curl https://YOUR_API_GATEWAY_URL/visitor-count

# Increment count
curl -X POST https://YOUR_API_GATEWAY_URL/visitor-count
```

## Cost Estimates

- **S3**: ~$0.023 per GB/month + minimal request costs
- **CloudFront**: Free tier includes 1TB data transfer out/month
- **Lambda**: Free tier includes 1M requests/month
- **API Gateway**: Free tier includes 1M requests/month for HTTP APIs
- **DynamoDB**: Free tier includes 25GB storage + 25 RCU/WCU

For a personal portfolio with moderate traffic, this should stay within the AWS free tier.

## Troubleshooting

### CORS Issues

If you see CORS errors in the browser console:

1. Check Lambda function returns proper CORS headers
2. Verify API Gateway CORS configuration
3. Ensure your domain is allowed (or use `*` for testing)

### Lambda Not Updating

Clear the function cache:

```bash
aws lambda update-function-configuration \
  --function-name visitor-counter \
  --environment Variables={DYNAMODB_TABLE_NAME=visitor-counter,UPDATED=$(date +%s)} \
  --region us-east-1
```

### DynamoDB Access Issues

Verify the Lambda execution role has DynamoDB permissions:

```bash
aws iam get-role-policy \
  --role-name visitor-counter-lambda-role \
  --policy-name DynamoDBAccess
```

## Next Steps

1. Set up a custom domain with Route 53
2. Configure SSL/TLS certificate with ACM
3. Set up CloudWatch alarms for monitoring
4. Implement Lambda function logging
5. Add rate limiting to prevent abuse
6. Set up automated backups for DynamoDB

## Clean Up

To remove all resources:

```bash
# Delete CloudFront distribution (if created)
# Delete S3 bucket
aws s3 rb s3://your-portfolio-website --force

# Delete API Gateway
aws apigatewayv2 delete-api --api-id YOUR_API_ID

# Delete Lambda function
aws lambda delete-function --function-name visitor-counter

# Delete DynamoDB table
aws dynamodb delete-table --table-name visitor-counter

# Delete IAM role and policies
aws iam delete-role-policy --role-name visitor-counter-lambda-role --policy-name DynamoDBAccess
aws iam detach-role-policy --role-name visitor-counter-lambda-role --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws iam delete-role --role-name visitor-counter-lambda-role
```
