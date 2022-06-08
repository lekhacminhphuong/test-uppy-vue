const express = require("express");
var cors = require("cors");
const app = express();
var aws = require("aws-sdk");
const bodyParser = require("body-parser");

// configure AWS access
aws.config.update({
  accessKeyId: "your-access-key-id",
  secretAccessKey: "your-secret-access-key",
  signatureVersion: "v4",
  region: "your-region",
});

var s3 = new aws.S3();
const myBucket = "your-bucket-name";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("server is working");
});

// Uppy upload route
app.post("/uppyFile", (req, res) => {
  const uniqueKey =
    (Math.random() + 1).toString(36).substring(2) +
    (Math.random() + 1).toString(36).substring(2) +
    "_" +
    req.body.filename;

  // set up parameter for the presigned key
  const params = {
    Bucket: myBucket,
    Key: uniqueKey,
    ContentType: req.body.contentType,
  };

  // get presigned URL from AWS
  s3.getSignedUrl("putObject", params, (err, url) => {
    // send URL back to client
    res.status(200).json({
      method: "put",
      url,
      key: uniqueKey,
      fields: {},
    });
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
