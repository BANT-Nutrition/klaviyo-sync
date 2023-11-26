import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./openapi.json";

export const app = express();

const options = {
  explorer: true,
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);
app.get("/api", (req, res) => {
  res.end(`Hello! from home`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});

app.listen(3000);
