<template>
  <div>
    <div>Uppy Demo</div>
    <div id="dashboard">
      <!-- Uppy's upload template -->
      <dashboard ref="dash" :uppy="uppy" />
    </div>
  </div>
</template>

<script>
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/vue";
import AwsS3 from "@uppy/aws-s3";

const uppy = new Uppy();

// use Uppy Aws S3 plugin
uppy.use(AwsS3, {
  fields: [],

  getUploadParameters(file) {
    // prepare a request to server for the upload URL
    return (
      // send data via fetch to our nodejs server endpoint, '/uppyFile'
      fetch("http://localhost:3000/uppyFile", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
        }),
      })
        // return server's response as a JSON promise
        .then((response) => {
          return response.json();
        })

        // use data that server sent back to upload file to bucket
        .then((data) => {
          return {
            method: data.method,
            url: data.url,
            fields: data.fields,
            headers: {
              "Content-Type": file.type,
            },
          };
        })
    );
  },
});

// Update status for Uppy after the upload is done
uppy.on("complete", (result) => {
  if (result.successful) {
    console.log("Upload complete! ");
  } else {
    console.log("Upload error: ");
  }
});

export default {
  name: "UppyDashboard",
  components: {
    Dashboard,
  },
  data: () => {
    return {
      uppy,
    };
  },
  computed: {
    // uppy: () => new Uppy({}),
  },
  beforeUnmount() {
    this.uppy.close();
  },
};
</script>

<style>
div {
  margin: auto;
}
#dashboard {
  margin-top: 20px;
}
</style>
