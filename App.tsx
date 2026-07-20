import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ShoppingBag, Menu, User, Settings, Sparkles, ArrowRight } from 'lucide-react';
import Storefront from './pages/Storefront';
import AdminDashboard from './pages/AdminDashboard';
import ProductPage from './pages/ProductPage';

function Navigation() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-bold tracking-tighter uppercase text-primary">NEXORA</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <Link to="/" className="text-primary hover:text-primary transition-colors">Explore</Link>
              <Link to="/" className="hover:text-primary transition-colors">Marketplace</Link>
              <Link to="/" className="hover:text-primary transition-colors">Collections</Link>
              <Link to="/" className="hover:text-primary transition-colors">Guides</Link>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex relative items-center bg-slate-100 px-4 py-2 rounded-full w-64 border border-transparent focus-within:border-accent focus-within:bg-white transition-colors">
              <input 
                type="text" 
                placeholder="AI Search..." 
                className="w-full bg-transparent border-none text-xs text-primary focus:outline-none placeholder-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-4 text-slate-400">
              <button className="hover:text-primary transition-colors md:hidden">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/admin" className="hover:text-primary transition-colors relative group">
                <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
              </Link>
              <button className="hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
              </button>
              <button className="hover:text-primary transition-colors md:hidden">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-primary border-8 border-primary selection:bg-accent/20 selection:text-accent">
      {!isAdmin && <Navigation />}
      
      <main className={`flex-grow flex flex-col ${!isAdmin ? 'pt-16' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex-grow flex flex-col"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {!isAdmin && (
        <footer className="py-4 bg-primary border-t border-white/10 flex flex-col md:flex-row items-center justify-between px-10 text-[10px] text-white/40 font-medium uppercase tracking-widest gap-4">
          <div>&copy; {new Date().getFullYear()} NEXORA HYBRID COMMERCE. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/" className="hover:text-white transition-colors">Affiliate Disclosure</Link>
            <Link to="/" className="hover:text-white transition-colors">Global Shipping</Link>
          </div>
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Storefront />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="admin/*" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
