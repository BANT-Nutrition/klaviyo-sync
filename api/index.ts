import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (_, res) => {
  res.end(`homepage`);
});

app.get("/klaviyo-sync", (req, res) => {
  const accessToken = req.get("access-token");
  if (accessToken !== "hkh3k4hiuh3h6k5gjk")
    return res.status(401).end(`unauthorized`);
  return res.end("synced successfully");
});

app.post("/api/item", (req, res) => {
  const data = req.body;
  res.json({ data });
});

app.get("/api/item/:itemId", (req, res) => {
  const { itemId } = req.params;
  res.end(`Item: ${itemId}`);
});

app.put("/api/item/:itemId", (req, res) => {
  const { itemId } = req.params;
  res.end(`updated Item: ${itemId}`);
});

app.listen(3000, () => console.log("server listening on port 3000"));

export default app;
