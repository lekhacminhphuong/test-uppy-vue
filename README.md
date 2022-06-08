# Uppy Demo
The project gets AWS S3 working with Uppy using NodeJS and Express for backend side and Vue for client side. The goal is to test Uppy dashboard UI and Uppy plugin for AWS S3 destination. 

## Run locally
- Install dependencies: `npm install`
- Add your AWS access config in `main.js`
- Start the server: `npm run serve` (server running on `localhost:3000`)
- Serve Vue app: `cd ui`, `npm run serve` (app running on `localhost:8080`)

## Sources
- [Uppy Docs](https://uppy.io/docs/)
- [AWS - Using Presigned URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html)
