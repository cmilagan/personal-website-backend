variable "function_name" {
  type        = string
  description = "Name of the Lambda function"
  default     = "visitor-count-function"
}

variable "runtime" {
  type        = string
  description = "Lambda runtime"
  default     = "python3.12"
}

variable "tags" {
  type        = map(string)
  description = "Tags to apply to Lambda resources"
  default     = {}
}
