"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./src/routes/api"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use("/api", (0, cors_1.default)(), api_1.default);
app.get("*", (_req, res) => {
    res.json({
        status: "error",
        msg: "Invalid URL",
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map