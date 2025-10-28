# Lambda Code

This directory contains the Python code for Lambda functions.

## Structure

Place your Lambda function code here. For example:

```
lambda_code/
├── visitor_count/
│   ├── handler.py
│   ├── requirements.txt
│   └── tests/
└── other_function/
    ├── handler.py
    └── requirements.txt
```

## Development

1. Create a subdirectory for each Lambda function
2. Include a `handler.py` with your Lambda handler function
3. Add a `requirements.txt` for Python dependencies
4. The Terraform Lambda module will package and deploy this code
