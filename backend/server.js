import express from "express";
import cors from "cors";
import helmet from "helmet";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3000;

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || false
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    name: "Clipora AI Backend",
    status: "online"
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    service: "clipora-backend"
  });
});

app.get("/storage-check", async (req, res) => {
  try {
    const { data, error } = await supabase.storage
      .getBucket("clipora-videos");

    if (error) throw error;

    res.json({
      status: "connected",
      bucket: data.name,
      public: data.public
    });
  } catch (error) {
    console.error("Storage check failed:", error.message);
    res.status(500).json({
      status: "error",
      message: "Could not access Clipora storage"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Clipora backend running on port ${PORT}`);
});
