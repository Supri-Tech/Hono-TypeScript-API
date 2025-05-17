// generate-signature.js
import crypto from "crypto";

const clientKey = "secret";
const secret =
  "17b85ea2684a9852acab1b9ba27b01829f722a34d4f27c44b163f4c0a5d297d371f7e06bb3a3d948ca264114a5f687d8d3b5d2d75917c1ba832ea3cf9f96de55ff3eab06ee2d5fc216c477";
const body = JSON.stringify({
  username: "testuser",
  password: "secret123",
  role: "user",
});
const timestamp = Date.now().toString();

const data = clientKey + timestamp + body;
const signature = crypto
  .createHmac("sha256", secret)
  .update(data)
  .digest("hex");

console.log("x-client-key:", clientKey);
console.log("x-timestamp:", timestamp);
console.log("x-signature:", signature);
