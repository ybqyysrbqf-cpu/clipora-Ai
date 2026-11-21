import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || false
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    name: "Clipora AI Backend",
    status: "online",
    message: "Welcome to Clipora API"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "clipora-backend"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Clipora backend running on port ${PORT}`);
});
