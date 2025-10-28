variable "origin_domain_name" {
  type        = string
  description = "The domain name of the origin (S3 bucket)"
  default     = ""
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to CloudFront resources"
  default     = {}
}
