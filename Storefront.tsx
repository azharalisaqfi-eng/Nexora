import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ExternalLink, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { Product } from '../types';

export default function Storefront() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products?featured=true')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  return (
    <div className="bg-background flex flex-col flex-1">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col lg:flex-row px-4 sm:px-10 py-12 lg:py-24 gap-12 lg:gap-8 items-center justify-between max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex-1 flex flex-col justify-center max-w-[550px]"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-8 w-fit">
            Premium Global Platform
          </div>
          <h1 className="text-6xl md:text-[84px] leading-[0.9] font-bold tracking-tight mb-8 text-primary">
            Discover.<br/>
            Compare.<br/>
            <span className="text-accent">Shop Smarter.</span>
          </h1>
          <p className="text-xl text-slate-500 mb-10 leading-relaxed">
            The billion-dollar hybrid marketplace for fashion, luxury electronics, and AI-powered recommendations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors shadow-xl shadow-slate-200">
              Shop New Arrivals
            </Link>
            <Link to="/" className="bg-white border-2 border-slate-200 text-primary px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-900 transition-colors">
              View Collections
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative flex items-center justify-center w-full max-w-md lg:max-w-none"
        >
          <div className="w-full bg-white rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(15,23,42,0.1)] border border-slate-100">
            <div className="flex justify-between items-start mb-8">
              <div className="flex gap-2">
                <div className="bg-primary text-white text-[10px] px-2 py-1 rounded uppercase font-black tracking-tighter">Nexora Select</div>
                <div className="bg-emerald-500 text-white text-[10px] px-2 py-1 rounded uppercase font-black">In Stock</div>
              </div>
              <div className="text-slate-300 font-mono text-sm">SKU: NX-8290-L</div>
            </div>
            <div className="h-48 bg-slate-50 rounded-2xl mb-8 flex items-center justify-center overflow-hidden">
               <img src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800" alt="Hero product" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Sony WH-1000XM5</h3>
            <p className="text-slate-400 text-sm mb-6">Industry Leading Noise Canceling with Auto Noise Canceling Optimizer.</p>
            <div className="space-y-3 mb-8">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-sm font-bold">Nexora Direct Store</span>
                <span className="font-bold text-accent">$348.00</span>
              </div>
              <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl opacity-60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium uppercase tracking-widest">Amazon.com</span>
                </div>
                <span className="text-sm font-medium">$399.99</span>
              </div>
            </div>
            <button className="w-full bg-accent text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
              Add to Smart Cart
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-6 rounded-3xl shadow-2xl hidden md:block">
            <div className="text-xs font-bold uppercase opacity-80 mb-1">AI Match</div>
            <div className="text-3xl font-black">98%</div>
          </div>
        </motion.div>
      </div>

      {/* Featured Products */}
      <div className="bg-secondary py-16 px-4 sm:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40 mb-2">Featured Selection</h2>
              <p className="text-white/60 text-sm">Hand-picked premium products curated for you.</p>
            </div>
            <Link to="/" className="inline-flex items-center gap-1 text-white text-sm font-bold hover:text-accent transition-colors">
              VIEW ALL <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-5 bg-white/10">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {product.isAffiliate && (
                    <div className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter flex items-center gap-1 shadow-sm">
                      <ExternalLink className="w-3 h-3" />
                      {product.storeName}
                    </div>
                  )}
                  
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <Link 
                      to={`/product/${product.id}`}
                      className="block w-full bg-accent text-white text-center py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-white/50 font-bold uppercase tracking-widest">{product.brand}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-white">4.9</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-lg leading-tight mb-3 group-hover:text-accent transition-colors line-clamp-1">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-white/40 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
