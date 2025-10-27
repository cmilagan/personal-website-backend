# defines terraform block, which then defines the providers,
# remote backend and terraform version(s) to be used in configuration
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.18.0"
    }
  }

  required_version = ">= 1.2"
}
