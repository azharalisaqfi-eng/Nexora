import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Create a directory for data if it doesn't exist
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const db = new Database(path.join(dataDir, 'nexora.db'));

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    originalPrice REAL,
    image TEXT,
    category TEXT,
    brand TEXT,
    isAffiliate BOOLEAN DEFAULT 0,
    affiliateLink TEXT,
    storeName TEXT,
    inStock BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date TEXT NOT NULL UNIQUE,
    revenue REAL DEFAULT 0,
    visitors INTEGER DEFAULT 0,
    orders INTEGER DEFAULT 0
  );
`);

// Seed initial data if empty
const count = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
if (count.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products (title, description, price, originalPrice, image, category, brand, isAffiliate, affiliateLink, storeName, featured)
    VALUES (@title, @description, @price, @originalPrice, @image, @category, @brand, @isAffiliate, @affiliateLink, @storeName, @featured)
  `);

  const initialProducts = [
    {
      title: "Sony WH-1000XM5 Wireless Headphones",
      description: "Industry Leading Noise Canceling with Auto Noise Canceling Optimizer.",
      price: 348.00,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800",
      category: "Electronics",
      brand: "Sony",
      isAffiliate: 1,
      affiliateLink: "https://amazon.com",
      storeName: "Amazon",
      featured: 1
    },
    {
      title: "Apple Watch Ultra 2",
      description: "Rugged and capable, built to meet the demands of endurance athletes.",
      price: 799.00,
      originalPrice: 799.00,
      image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&q=80&w=800",
      category: "Electronics",
      brand: "Apple",
      isAffiliate: 0,
      affiliateLink: null,
      storeName: "Nexora Direct",
      featured: 1
    },
    {
      title: "Minimalist Leather Backpack",
      description: "Handcrafted full-grain leather backpack for everyday commute.",
      price: 189.00,
      originalPrice: 250.00,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
      category: "Fashion",
      brand: "Artisan",
      isAffiliate: 0,
      affiliateLink: null,
      storeName: "Nexora Direct",
      featured: 0
    },
    {
      title: "Dyson Airwrap Multi-Styler",
      description: "Style with air, not extreme heat. For multiple hair types and styles.",
      price: 599.99,
      originalPrice: 599.99,
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
      category: "Beauty",
      brand: "Dyson",
      isAffiliate: 1,
      affiliateLink: "https://amazon.com",
      storeName: "Best Buy",
      featured: 1
    }
  ];

  for (const product of initialProducts) {
    insertProduct.run(product);
  }
  
  const insertAnalytics = db.prepare(`INSERT INTO analytics (date, revenue, visitors, orders) VALUES (@date, @revenue, @visitors, @orders)`);
  // Seed last 7 days
  for(let i=6; i>=0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    insertAnalytics.run({
      date: d.toISOString().split('T')[0],
      revenue: Math.floor(Math.random() * 5000) + 1000,
      visitors: Math.floor(Math.random() * 1000) + 200,
      orders: Math.floor(Math.random() * 50) + 10
    });
  }
}

export default db;
