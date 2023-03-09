import { ZodError, z } from "zod";
const configSchema = z.object({
  API_URL: z.string().url(),
  API_KEY: z.string(),
});

export const loadConfig = () => {
  try {
    const config = configSchema.parse(process.env);
    return {
      apiUrl: config.API_URL,
      apiKey: config.API_KEY,
    };
  } catch (err) {
    if (err instanceof ZodError) {
      console.error("Invalid config", err);
      process.exit(1);
    }
  }
};
