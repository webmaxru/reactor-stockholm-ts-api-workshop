"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const app_config_1 = require("./app-config");
const app = (0, express_1.default)();
const config = (0, app_config_1.loadConfig)();
app.get('/times/:stationId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schema = zod_1.z.object({
            stationId: zod_1.z.string().transform((val) => Number(val)),
        });
        const { stationId } = schema.parse(req.params);
        const apiCall = yield fetch(`${config.apiUrl}?key=${config.apiKey}&siteid=${stationId}&timewindow=60`);
        const data = yield apiCall.json();
        res.json({
            stationId,
            results: data.ResponseData
        });
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            res.status(422).json({
                message: err.message,
                errors: err.errors,
                cause: err.issues,
            });
        }
    }
}));
app.listen(config === null || config === void 0 ? void 0 : config.port, () => {
    console.log(`Server started on port ${config.port}`);
});
