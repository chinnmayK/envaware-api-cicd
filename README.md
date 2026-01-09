# EnvAware API CI/CD Project

## 🚀 Overview

**EnvAware API** is a simple Node.js web service that displays health and environment information through a web page and API endpoints. The primary focus of this project is to showcase a complete **AWS CI/CD pipeline**, including:

- GitHub as the code source
- CodeBuild for automated builds
- S3 for artifact storage
- CodeDeploy for deployment automation
- EC2 as the deployment target
- CodePipeline for end-to-end automation

Whenever code is pushed to GitHub, the CI/CD pipeline automatically builds and deploys the application to an EC2 instance.

---

## 📦 Features

- Serves a web page with:
  - Application health status
  - Environment name
  - Application version
  - Deployment timestamp
- Provides REST API endpoints:
  - `GET /health` — JSON status
  - `GET /env` — JSON environment info
- Fully automated AWS CI/CD pipeline

---

## 📁 Project Structure

```

envaware-api-cicd/
├── appspec.yml                  # CodeDeploy instructions
├── buildspec.yml                # CodeBuild build instructions
├── scripts/
│   ├── before_install.sh        # Cleanup and prep before install
│   ├── after_install.sh         # Install dependencies and create .env
│   └── start_app.sh             # Start the app
├── src/
│   └── index.js                 # Express server
├── .gitignore
├── README.md
└── package.json

````

---

## 🧠 Requirements

- Node.js (v18+)
- AWS CLI configured
- AWS account with permissions to use:
  - S3
  - EC2
  - CodePipeline
  - CodeBuild
  - CodeDeploy
- GitHub account & repository

---

## 🔧 Application Description

This Node.js app uses Express to serve:

| Route          | Response                     |
|----------------|------------------------------|
| `/`            | HTML page with app info      |
| `/health`      | `{ status: "UP" }`           |
| `/env`         | Environment and version info|

Environment variables (in `.env`):

```text
APP_NAME=EnvAware API
APP_ENV=production
APP_VERSION=1.0.0
DEPLOY_TIME=<timestamp>
PORT=3000
````

---

## 🚀 CI/CD Workflow

### 1. **GitHub (Source)**

All source code is stored in a GitHub repository.
A GitHub webhook triggers the pipeline on every push.

### 2. **CodePipeline (Orchestration)**

AWS CodePipeline automates the workflow:

```
GitHub → CodeBuild → S3 → CodeDeploy → EC2
```

### 3. **CodeBuild (Build + Artifact)**

* Pulls source from GitHub
* Runs build steps (install dependencies)
* Packages source into a ZIP artifact
* Uploads artifact to S3

### 4. **S3 (Artifact Storage)**

Stores build artifacts for deployment.

### 5. **CodeDeploy (Deployment)**

Deploys the artifact to an EC2 instance using `appspec.yml` and lifecycle scripts.

### 6. **EC2 (Deployment Target)**

An EC2 instance with CodeDeploy agent deploys the app and runs it using Node.js.

---

## 📁 Important Files

### `buildspec.yml`

Tells CodeBuild how to build and package:

```yaml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 18
    commands:
      - echo "Installing dependencies"
      - npm install

  pre_build:
    commands:
      - echo "Pre-build checks"
      - node -v
      - npm -v

  build:
    commands:
      - echo "Build started"
      - echo "Environment: $APP_ENV"
      - echo "Version: $APP_VERSION"

  post_build:
    commands:
      - echo "Build completed"

artifacts:
  files:
    - '**/*'
  discard-paths: no
```

### `appspec.yml`

Tells CodeDeploy how to deploy:

```yaml
version: 0.0
os: linux

files:
  - source: /
    destination: /opt/envaware

hooks:
  BeforeInstall:
    - location: scripts/before_install.sh
      runas: ec2-user

  AfterInstall:
    - location: scripts/after_install.sh
      runas: ec2-user

  ApplicationStart:
    - location: scripts/start_app.sh
      runas: ec2-user
```

---

## 🧪 Testing Locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env`:

   ```env
   APP_ENV=local
   APP_VERSION=1.0.0
   DEPLOY_TIME=local
   PORT=3000
   ```

3. Run the app:

   ```bash
   npm start
   ```

4. Visit:

   ```
   http://localhost:3000
   ```

---

## 🛠 Deployment Verification

After push and pipeline completion:

1. Visit the app:

   ```
   http://<EC2_PUBLIC_IP>:3000
   ```

2. Check endpoints:

   * `GET /health`
   * `GET /env`

You should see updated version info after pushes.

---

## 🧠 Troubleshooting

### Common issues:

* **Pipeline fails at source stage**

  * Check GitHub connection permissions
* **CodeBuild errors**

  * Inspect CloudWatch logs under `/aws/codebuild/<project-name>`
* **CodeDeploy fails**

  * SSH into EC2 and inspect `/opt/codedeploy-agent/deployment-logs`

---

## 🚮 Cleanup Steps

If you want to remove all resources and avoid costs:

1. Terminate EC2 instance
2. Delete CodePipeline
3. Delete CodeBuild project
4. Delete CodeDeploy application
5. Empty & delete S3 bucket
6. Delete IAM roles & policies
7. Remove GitHub connection

---

