import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from '../types';
import { Star, Shield, Truck, ExternalLink, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Product) => p.id === Number(id));
        setProduct(found || null);
      })
      .catch(console.error);
  }, [id]);

  if (!product) return <div className="min-h-screen pt-32 text-center">Loading...</div>;

  return (
    <div className="bg-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          Home / {product.category} / <span className="text-primary font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {product.isAffiliate && (
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-sm text-sm font-semibold flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-accent" />
                  Available on {product.storeName}
                </div>
              )}
            </div>
            {/* Thumbnails placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className={`aspect-square rounded-xl bg-gray-100 overflow-hidden border-2 ${i === 1 ? 'border-primary' : 'border-transparent cursor-pointer hover:border-gray-300'}`}>
                   <img src={product.image} alt="thumbnail" className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="inline-flex items-center gap-2 bg-blue-50 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                {product.brand}
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6 leading-tight">
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(star => (
                    <Star key={star} className={`w-5 h-5 ${star === 5 ? 'text-slate-300 fill-slate-300' : 'text-warning fill-warning'}`} />
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-bold">4.8 (124 reviews)</span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through mb-1">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-success text-white px-2 py-1 rounded text-xs font-black uppercase tracking-wider mb-2 ml-2">
                    Save ${ (product.originalPrice - product.price).toFixed(2) }
                  </span>
                )}
              </div>

              <p className="text-slate-500 text-lg leading-relaxed mb-10 border-b border-slate-200 pb-10">
                {product.description}
              </p>
            </div>

            <div className="mt-auto">
              {product.isAffiliate ? (
                <a 
                  href={product.affiliateLink || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                >
                  Buy on {product.storeName}
                  <ExternalLink className="w-5 h-5" />
                </a>
              ) : (
                <button className="w-full bg-accent text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                  Add to Cart
                </button>
              )}
              
              {product.isAffiliate && (
                <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mt-4">
                  Nexora earns a commission on qualifying purchases from {product.storeName}.
                </p>
              )}

              {/* Badges */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-slate-200">
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                    <Shield className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-primary">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-primary">Global Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-primary">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-bold text-primary">30 Day Returns</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
