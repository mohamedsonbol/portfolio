$ErrorActionPreference = "Stop"

$PROJECT_ID = "gtm-tnp59m8-yjyxz"
$SERVICE_NAME = "server-side-tagging"
$DOMAIN = "sst.dev.exceptionalgrp.com"
$REGION = "us-central1" # Make sure this matches the region you deployed to

$GCLOUD = "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"

Write-Host "Setting active GCP project to $PROJECT_ID..." -ForegroundColor Cyan
& $GCLOUD config set project $PROJECT_ID

Write-Host "`nMapping domain $DOMAIN to Cloud Run service $SERVICE_NAME..." -ForegroundColor Cyan

# The gcloud beta run domain-mappings command is used to map custom domains to Cloud Run services
& $GCLOUD beta run domain-mappings create `
  --service $SERVICE_NAME `
  --domain $DOMAIN `
  --region $REGION

Write-Host "`nDomain mapping initiated!" -ForegroundColor Green
Write-Host "IMPORTANT: You must update your DNS records in Cloudflare (or your DNS provider)." -ForegroundColor Yellow
Write-Host "Run the following command to see the DNS records you need to add:" -ForegroundColor Yellow
Write-Host "gcloud beta run domain-mappings describe --domain $DOMAIN --region $REGION" -ForegroundColor Cyan
