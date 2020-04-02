require("dotenv").config({ path: require("find-config")(".env") })
module.exports = {
  AWS: {
    KEY: process.env.AWS_KEY,
    SECRET: process.env.AWS_SECRET,
    REGION: process.env.AWS_REGION,
    BUCKET: process.env.AWS_BUCKET
  }
}