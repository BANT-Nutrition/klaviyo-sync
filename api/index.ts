import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import swaggerDocument from "../openapi.json";

const app = express();
app.use(cors());

const options = {
  explorer: true,
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);

app.get("/api", (_, res) => {
  res.end(`Hello from home`);
});

app.post("/api/item", (req, res) => {
  const data = req.body;
  res.json({ data });
});

app.get("/api/item:itemId", (req, res) => {
  const { itemId } = req.params;
  res.end(`Item: ${itemId}`);
});

app.put("/api/item:itemId", (req, res) => {
  const { itemId } = req.params;
  res.end(`updated Item: ${itemId}`);
});

export default app;
