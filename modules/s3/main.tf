# Create S3 Bucket
resource "aws_s3_bucket" "website_bucket" {
  bucket = "cmilagan_website_bucket"

  tags = {
    Name        = "My Website Bucket"
    Environment = "Production"
  }
}

# Configure S3