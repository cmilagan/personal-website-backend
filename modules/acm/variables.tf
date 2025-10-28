variable "domain_name" {
  type        = string
  description = "Domain name for the ACM certificate"
  default     = ""
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to ACM resources"
  default     = {}
}
