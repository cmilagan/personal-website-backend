variable "bucket_name" {
  type        = string
  description = "Name of the S3 bucket for website hosting"
  default     = "cmilagan_website_bucket"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to S3 resources"
  default = {
    Name        = "My Website Bucket"
    Environment = "Production"
  }
}
