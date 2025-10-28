provider "aws" {
  region = var.region
}

# S3 bucket for website hosting
module "s3" {
  source = "./modules/s3"
}

# ACM certificate for HTTPS
module "acm" {
  source = "./modules/acm"
}

# CloudFront CDN
module "cloudfront" {
  source = "./modules/cloudfront"
}

# API Gateway
module "apigateway" {
  source = "./modules/apigateway"
}

# DynamoDB table for visitor count
module "dynamodb" {
  source = "./modules/dynamodb"
}

# Lambda function
module "lambda" {
  source = "./modules/lambda"
}