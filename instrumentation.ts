import { registerOTel } from "@vercel/otel";

export function register() {
  registerOTel({ serviceName: "KS3-Subjects-Helper" });
}
