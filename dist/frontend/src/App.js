"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const Station_1 = __importDefault(require("./components/Station"));
function App() {
    return <Station_1.default stationName="Slussen"></Station_1.default>;
}
exports.default = App;
