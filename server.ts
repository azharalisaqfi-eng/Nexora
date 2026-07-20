import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import db from "./src/db/index.ts";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "dummy" });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  
  // Get all products
  app.get("/api/products", (req, res) => {
    try {
      const { featured, limit } = req.query;
      let query = "SELECT * FROM products ORDER BY createdAt DESC";
      if (featured === 'true') {
        query = "SELECT * FROM products WHERE featured = 1 ORDER BY createdAt DESC";
      }
      if (limit) {
        query += ` LIMIT ${parseInt(limit as string, 10)}`;
      }
      const products = db.prepare(query).all();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get Analytics
  app.get("/api/analytics", (req, res) => {
    try {
      const data = db.prepare("SELECT * FROM analytics ORDER BY date ASC LIMIT 7").all();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // AI Product Description Generator
  app.post("/api/ai/generate-description", async (req, res) => {
    try {
      const { title, keywords } = req.body;
      if (!process.env.GEMINI_API_KEY) {
        return res.status(400).json({ error: "GEMINI_API_KEY is not configured" });
      }
      const prompt = `Write a premium, luxury eCommerce product description for "${title}". 
      Use these keywords: ${keywords}. 
      Keep it professional, engaging, highlighting benefits, and under 150 words.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      res.json({ description: response.text });
    } catch (err) {
      res.status(500).json({ error: "Failed to generate AI description" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
