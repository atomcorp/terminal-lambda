variable "aws_region" {
  default = "eu-west-2"
}

provider "aws" {
  region = var.aws_region
}

data "archive_file" "get_lambda_zip" {
  type        = "zip"
  source_dir  = "build/get-themes"
  output_path = "get_themes.zip"
}

resource "aws_lambda_function" "get_themes" {
  filename         = "get_themes.zip"
  function_name    = "get_themes"
  role             = aws_iam_role.iam_for_lambda_tf.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.get_lambda_zip.output_base64sha256
  runtime          = "nodejs16.x"
}

data "archive_file" "serve_lambda_zip" {
  type        = "zip"
  source_dir  = "build/serve-themes"
  output_path = "serve_themes.zip"
}

resource "aws_lambda_function" "serve_themes" {
  filename         = "serve_themes.zip"
  function_name    = "serve_themes"
  role             = aws_iam_role.iam_for_lambda_tf.arn
  handler          = "index.handler"
  source_code_hash = data.archive_file.serve_lambda_zip.output_base64sha256
  runtime          = "nodejs16.x"
}

resource "aws_iam_role" "iam_for_lambda_tf" {
  name = "iam_for_lambda_tf"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}