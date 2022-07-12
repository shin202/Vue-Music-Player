import express from "express";
import api from "./src/routes/api";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use("/api", cors(), api);

app.get("*", (_req, res) => {
    res.json(
        {
            status: "error",
            msg: "Invalid URL",
        }
    );
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;