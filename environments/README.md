# Environments

This directory is intended for environment-specific Terraform configurations.

## Structure

```
environments/
├── dev/
│   ├── terraform.tfvars
│   └── backend.tf
├── staging/
│   ├── terraform.tfvars
│   └── backend.tf
└── prod/
    ├── terraform.tfvars
    └── backend.tf
```

## Usage

Each environment should have its own directory with environment-specific variable files and backend configuration.
