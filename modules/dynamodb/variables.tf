variable "table_name" {
  type        = string
  description = "Name of the DynamoDB table"
  default     = "visitor-count"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to DynamoDB resources"
  default     = {}
}
