import { createHmac } from "crypto";

export const generateHMACSignature = ({
  clientKey,
  timestamp,
  body,
  secret,
}: {
  clientKey: string;
  timestamp: string;
  body: string;
  secret: string;
}) => {
  const message = `${clientKey}|${timestamp}|${body}|`;
  return createHmac("sha256", secret).update(message).digest("hex");
};
