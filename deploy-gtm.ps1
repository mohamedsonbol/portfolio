$ErrorActionPreference = "Stop"

$PROJECT_ID = "gtm-tnp59m8-yjyxz"
$REGION = "us-central1" # Default region, can be changed
$SERVICE_NAME = "server-side-tagging"
$IMAGE = "gcr.io/cloud-tagging-free/google-tag-manager"

$CONTAINER_CONFIG = "aWQ9R1RNLU03UExITUhKJmVudj0yJmF1dGg9Z3FleUNFcGJhRDVrLVRPd0lLZVR4dw=="
$RUN_AS_PREVIEW_SERVER = "true"
$PORT = "8080"

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"

Write-Host "Setting active GCP project to $PROJECT_ID..." -ForegroundColor Cyan
& $GCLOUD config set project $PROJECT_ID

Write-Host "`nEnabling required APIs (run.googleapis.com, artifactregistry.googleapis.com)..." -ForegroundColor Cyan
& $GCLOUD services enable run.googleapis.com artifactregistry.googleapis.com

Write-Host "`nDeploying GTM Server-Side to Cloud Run..." -ForegroundColor Cyan
Write-Host "Service Name: $SERVICE_NAME"
Write-Host "Image: $IMAGE"

& $GCLOUD run deploy $SERVICE_NAME `
  --image=$IMAGE `
  --region=$REGION `
  --platform=managed `
  --allow-unauthenticated `
  --port=$PORT `
  --min-instances=1 `
  --max-instances=5 `
  --no-cpu-throttling `
  --set-env-vars="CONTAINER_CONFIG=$CONTAINER_CONFIG,RUN_AS_PREVIEW_SERVER=$RUN_AS_PREVIEW_SERVER,PORT=$PORT"

Write-Host "`nDeployment completed!" -ForegroundColor Green
Write-Host "Check the output above for the Service URL to use in your GTM Server Container settings." -ForegroundColor Yellow
