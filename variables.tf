variable "region" {
  type        = string
  description = "AWS region for all resources."

  default = "ap-southeast-2"
}

variable "project_name" {
  type        = string
  description = "Name of the example project."

  default = "personal-website-backend"
}