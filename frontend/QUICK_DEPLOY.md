# Quick Deployment Reference

This is a quick reference for deploying your portfolio. See `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions.

## Prerequisites

1. AWS CLI installed and configured
2. DynamoDB table created: `visitor-counter`
3. Lambda function deployed with API Gateway
4. S3 bucket created and configured for static hosting

## Quick Deploy Steps

### 1. Set Your API Gateway URL

Create `.env.local`:

```bash
NEXT_PUBLIC_VISITOR_API_URL=https://YOUR_API_GATEWAY_URL/visitor-count
```

### 2. Build Static Site

```bash
npm run build
```

This creates the `out/` directory with static files.

### 3. Deploy to S3

```bash
aws s3 sync out/ s3://your-portfolio-website --delete
```

### 4. (Optional) Invalidate CloudFront Cache

If using CloudFront:

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Deploy Script

Or use the deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

## Local Development

For local development, leave `NEXT_PUBLIC_VISITOR_API_URL` empty in `.env.local` to use the Next.js API route:

```bash
npm run dev
```

## Files Overview

```
.
├── lambda/
│   └── visitor-counter/      # Lambda function code
│       ├── index.js           # Lambda handler
│       ├── package.json       # Lambda dependencies
│       └── function.zip       # Deployment package (generated)
├── .env.local                 # API Gateway URL configuration
├── .env.local.example         # Environment variable template
├── AWS_DEPLOYMENT_GUIDE.md    # Detailed deployment guide
└── QUICK_DEPLOY.md            # This file
```

## Useful Commands

### Update Lambda Function

```bash
cd lambda/visitor-counter
npm install
zip -r function.zip index.js node_modules/ package.json
aws lambda update-function-code \
  --function-name visitor-counter \
  --zip-file fileb://function.zip \
  --region us-east-1
cd ../..
```

### Check Visitor Count

```bash
curl https://YOUR_API_GATEWAY_URL/visitor-count
```

### Increment Visitor Count

```bash
curl -X POST https://YOUR_API_GATEWAY_URL/visitor-count
```

### View DynamoDB Table

```bash
aws dynamodb get-item \
  --table-name visitor-counter \
  --key '{"id": {"S": "site-visitors"}}'
```

## Project Structure Changes

- `next.config.ts`: Updated with `output: 'export'` for static builds
- `src/components/sections/Hero.tsx`: Uses `NEXT_PUBLIC_VISITOR_API_URL` env variable
- `lambda/visitor-counter/`: New Lambda function for visitor counter API
