import { NextRequest, NextResponse } from 'next/server'

// Mock resource definitions
const resourceTemplates = {
  'aws_instance': {
    name: 'EC2 Instance',
    description: 'Amazon EC2 instance',
    hcl: (name: string) => `resource "aws_instance" "${name}" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"
  
  tags = {
    Name = "${name}"
    Environment = "production"
  }
}`,
    plan: (name: string) => `+ aws_instance.${name}
  + ami           = "ami-0c55b159cbfafe1f0"
  + instance_type = "t3.micro"
  + tags          = {
      + "Environment" = "production"
      + "Name"        = "${name}"
    }`
  },
  
  'aws_s3_bucket': {
    name: 'S3 Bucket',
    description: 'Amazon S3 bucket',
    hcl: (name: string) => `resource "aws_s3_bucket" "${name}" {
  bucket = "${name}-${Date.now()}"
  
  tags = {
    Name = "${name}"
    Environment = "production"
  }
}

resource "aws_s3_bucket_versioning" "${name}" {
  bucket = aws_s3_bucket.${name}.id
  versioning_configuration {
    status = "Enabled"
  }
}`,
    plan: (name: string) => `+ aws_s3_bucket.${name}
  + bucket = "${name}-${Date.now()}"
  + tags   = {
      + "Environment" = "production"
      + "Name"        = "${name}"
    }

+ aws_s3_bucket_versioning.${name}
  + bucket = "${name}-${Date.now()}"
  + versioning_configuration {
      + status = "Enabled"
    }`
  },
  
  'aws_vpc': {
    name: 'VPC',
    description: 'Amazon VPC',
    hcl: (name: string) => `resource "aws_vpc" "${name}" {
  cidr_block = "10.0.0.0/16"
  
  tags = {
    Name = "${name}"
    Environment = "production"
  }
}

resource "aws_subnet" "${name}_subnet" {
  vpc_id     = aws_vpc.${name}.id
  cidr_block = "10.0.1.0/24"
  
  tags = {
    Name = "${name}-subnet"
  }
}`,
    plan: (name: string) => `+ aws_vpc.${name}
  + cidr_block = "10.0.0.0/16"
  + tags       = {
      + "Environment" = "production"
      + "Name"        = "${name}"
    }

+ aws_subnet.${name}_subnet
  + cidr_block = "10.0.1.0/24"
  + vpc_id     = (known after apply)
  + tags       = {
      + "Name" = "${name}-subnet"
    }`
  },
  
  'aws_rds_cluster': {
    name: 'RDS Cluster',
    description: 'Amazon RDS Aurora cluster',
    hcl: (name: string) => `resource "aws_rds_cluster" "${name}" {
  cluster_identifier = "${name}"
  engine             = "aurora-postgresql"
  engine_version     = "13.7"
  database_name      = "mydb"
  master_username    = "dbadmin"
  master_password    = "changeme123"
  
  tags = {
    Name = "${name}"
    Environment = "production"
  }
}`,
    plan: (name: string) => `+ aws_rds_cluster.${name}
  + cluster_identifier = "${name}"
  + database_name      = "mydb"
  + engine             = "aurora-postgresql"
  + engine_version     = "13.7"
  + master_password    = (sensitive value)
  + master_username    = "dbadmin"
  + tags               = {
      + "Environment" = "production"
      + "Name"        = "${name}"
    }`
  },
  
  'aws_lambda_function': {
    name: 'Lambda Function',
    description: 'AWS Lambda function',
    hcl: (name: string) => `resource "aws_lambda_function" "${name}" {
  filename         = "lambda_function.zip"
  function_name    = "${name}"
  role            = aws_iam_role.${name}_role.arn
  handler         = "index.handler"
  runtime         = "nodejs18.x"
  
  tags = {
    Name = "${name}"
    Environment = "production"
  }
}

resource "aws_iam_role" "${name}_role" {
  name = "${name}-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}`,
    plan: (name: string) => `+ aws_iam_role.${name}_role
  + name = "${name}-role"
  + assume_role_policy = jsonencode(
      + {
          + Statement = [
              + {
                  + Action    = "sts:AssumeRole"
                  + Effect    = "Allow"
                  + Principal = {
                      + Service = "lambda.amazonaws.com"
                    }
                }
            ]
          + Version = "2012-10-17"
        }
    )

+ aws_lambda_function.${name}
  + filename      = "lambda_function.zip"
  + function_name = "${name}"
  + handler       = "index.handler"
  + role          = (known after apply)
  + runtime       = "nodejs18.x"
  + tags          = {
      + "Environment" = "production"
      + "Name"        = "${name}"
    }`
  }
}

const generatePlanSummary = (resources: any[]) => {
  const total = resources.length
  const toAdd = total
  const toChange = 0
  const toDestroy = 0

  return {
    summary: `Plan: ${toAdd} to add, ${toChange} to change, ${toDestroy} to destroy.`,
    details: {
      toAdd,
      toChange,
      toDestroy,
      total
    }
  }
}

const generateTerminalOutput = (resources: any[], planSummary: any) => {
  let output = `Terraform will perform the following actions:\n\n`
  
  resources.forEach(resource => {
    const template = resourceTemplates[resource.type as keyof typeof resourceTemplates]
    if (template) {
      output += template.plan(resource.name) + '\n\n'
    }
  })
  
  output += `\n${planSummary.summary}\n`
  output += `\nDo you want to perform these actions?\n`
  output += `  Terraform will perform the actions described above.\n`
  output += `  Only 'yes' will be accepted to approve.\n\n`
  output += `  Enter a value: `
  
  return output
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { resources } = body

    if (!resources || !Array.isArray(resources)) {
      return NextResponse.json(
        { error: 'Resources array is required' },
        { status: 400 }
      )
    }

    // Generate HCL code
    let hclCode = `# Terraform configuration generated by TerraformX
# Generated on: ${new Date().toISOString()}

terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-2"
}

`

    // Add resources to HCL
    resources.forEach((resource: any) => {
      const template = resourceTemplates[resource.type as keyof typeof resourceTemplates]
      if (template) {
        hclCode += template.hcl(resource.name) + '\n\n'
      }
    })

    // Generate plan output
    const planSummary = generatePlanSummary(resources)
    const terminalOutput = generateTerminalOutput(resources, planSummary)

    const response = {
      hcl: hclCode,
      plan: {
        summary: planSummary,
        resources: resources.map((resource: any) => {
          const template = resourceTemplates[resource.type as keyof typeof resourceTemplates]
          return {
            type: resource.type,
            name: resource.name,
            action: 'create',
            description: template?.description || 'Unknown resource'
          }
        })
      },
      terminal: terminalOutput,
      metadata: {
        generatedAt: new Date().toISOString(),
        resourceCount: resources.length,
        estimatedCost: `$${(resources.length * 15.50).toFixed(2)}/month`,
        complexity: resources.length > 3 ? 'High' : resources.length > 1 ? 'Medium' : 'Low'
      }
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate Terraform preview' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return available resource types for the frontend
    const availableResources = Object.entries(resourceTemplates).map(([key, value]) => ({
      type: key,
      name: value.name,
      description: value.description
    }))

    return NextResponse.json({
      availableResources,
      lastUpdated: new Date().toISOString()
    }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch available resources' },
      { status: 500 }
    )
  }
} 