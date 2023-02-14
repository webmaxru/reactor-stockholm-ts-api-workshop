"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = void 0;
const zod_1 = require("zod");
const configSchema = zod_1.z.object({
    PORT: zod_1.z
        .string()
        .default("3000")
        .transform((val) => Number(val)),
    API_URL: zod_1.z.string().url(),
    API_KEY: zod_1.z.string(),
});
const loadConfig = () => {
    try {
        const config = configSchema.parse(process.env);
        return {
            port: Number(config.PORT),
            apiUrl: config.API_URL,
            apiKey: config.API_KEY,
        };
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            console.error("Invalid config", err);
            process.exit(1);
        }
    }
};
exports.loadConfig = loadConfig;
