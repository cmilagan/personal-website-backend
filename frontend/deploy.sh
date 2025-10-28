#!/bin/bash

# Deployment script for static site to S3
# Usage: ./deploy.sh [bucket-name] [cloudfront-distribution-id]

set -e  # Exit on error

# Configuration
BUCKET_NAME="${1:-your-portfolio-website}"
DISTRIBUTION_ID="${2:-}"

echo "========================================="
echo "Deploying Portfolio to AWS S3"
echo "========================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  Warning: .env.local not found!"
    echo "   Create it from .env.local.example and add your API Gateway URL"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Build the static site
echo "📦 Building static site..."
npm run build

if [ ! -d "out" ]; then
    echo "❌ Build failed: out/ directory not found"
    exit 1
fi

echo "✅ Build complete"
echo ""

# Upload to S3
echo "☁️  Uploading to S3 bucket: $BUCKET_NAME..."
aws s3 sync out/ s3://$BUCKET_NAME --delete

if [ $? -eq 0 ]; then
    echo "✅ Upload complete"
else
    echo "❌ Upload failed"
    exit 1
fi

echo ""

# Invalidate CloudFront cache if distribution ID provided
if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "🔄 Invalidating CloudFront cache..."
    aws cloudfront create-invalidation \
        --distribution-id $DISTRIBUTION_ID \
        --paths "/*" > /dev/null

    if [ $? -eq 0 ]; then
        echo "✅ CloudFront invalidation initiated"
    else
        echo "⚠️  CloudFront invalidation failed (non-critical)"
    fi
    echo ""
fi

# Display URLs
echo "========================================="
echo "Deployment Complete! 🚀"
echo "========================================="
echo ""
echo "S3 Website URL:"
echo "http://$BUCKET_NAME.s3-website-${AWS_REGION:-us-east-1}.amazonaws.com"
echo ""

if [ ! -z "$DISTRIBUTION_ID" ]; then
    echo "CloudFront URL:"
    echo "Check your CloudFront distribution for the URL"
    echo ""
fi

echo "To test the visitor counter API:"
echo "curl -X POST \$NEXT_PUBLIC_VISITOR_API_URL"
echo ""
