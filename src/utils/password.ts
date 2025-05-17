import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

const SALT_LENGTH = 16;
const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export const hashPass = (password: string): string => {
  const salt = randomBytes(SALT_LENGTH).toString("hex");
  const hash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST,
  ).toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPass = (password: string, hashed: string): boolean => {
  const [salt, originalHash] = hashed.split(":");
  const hash = pbkdf2Sync(
    password,
    salt,
    ITERATIONS,
    KEY_LENGTH,
    DIGEST,
  ).toString("hex");

  return timingSafeEqual(Buffer.from(hash), Buffer.from(originalHash));
};
