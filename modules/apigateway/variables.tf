variable "api_name" {
  type        = string
  description = "Name of the API Gateway"
  default     = "personal-website-api"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to API Gateway resources"
  default     = {}
}
