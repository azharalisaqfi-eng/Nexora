import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { LayoutDashboard, ShoppingBag, Users, BarChart3, Settings, Edit3, Plus, Sparkles, TrendingUp, DollarSign, Store } from 'lucide-react';
import { AnalyticsData, Product } from '../types';

export default function AdminDashboard() {
  const location = useLocation();
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(console.error);
  }, []);

  const totalRevenue = analytics.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalVisitors = analytics.reduce((acc, curr) => acc + curr.visitors, 0);
  const totalOrders = analytics.reduce((acc, curr) => acc + curr.orders, 0);

  const tabs = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Products CMS', path: '/admin/products', icon: ShoppingBag },
    { name: 'Affiliates', path: '/admin/affiliates', icon: Store },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'AI Tools', path: '/admin/ai-tools', icon: Sparkles },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary text-white flex items-center justify-center rounded-lg font-display font-bold">N</div>
            <span className="font-display font-semibold text-xl tracking-tight">Nexora Admin</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.pathname === tab.path;
            return (
              <Link
                key={tab.name}
                to={tab.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-accent/10 text-accent' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-gray-400'}`} />
                {tab.name}
              </Link>
            )
          })}
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gray-100 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
              <div>
                <p className="text-sm font-semibold">Admin User</p>
                <p className="text-xs text-gray-500">admin@nexora.com</p>
              </div>
            </div>
            <button className="w-full text-xs font-semibold text-gray-600 hover:text-primary transition-colors py-1">
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 p-8">
        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <header>
                <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">Dashboard Overview</h1>
                <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with your store today.</p>
              </header>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-lg shadow-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-accent">
                      <DollarSign className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded">+12.5%</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Revenue (7d)</p>
                  <h3 className="text-4xl font-black tracking-tighter text-primary">${totalRevenue.toLocaleString()}</h3>
                </div>
                
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-lg shadow-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
                      <Users className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-emerald-500 bg-emerald-50 px-2 py-1 rounded">+5.2%</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Visitors (7d)</p>
                  <h3 className="text-4xl font-black tracking-tighter text-primary">{totalVisitors.toLocaleString()}</h3>
                </div>

                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-lg shadow-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-black tracking-widest text-rose-500 bg-rose-50 px-2 py-1 rounded">-2.1%</span>
                  </div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Orders (7d)</p>
                  <h3 className="text-4xl font-black tracking-tighter text-primary">{totalOrders.toLocaleString()}</h3>
                </div>
              </div>

              {/* Chart Placeholder & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-lg shadow-slate-100 min-h-[400px] flex flex-col items-center justify-center text-slate-300">
                   <BarChart3 className="w-16 h-16 mb-4 opacity-50" />
                   <p className="font-bold tracking-tight">Analytics visualization ready for integration</p>
                </div>
                <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-lg shadow-slate-100">
                  <h3 className="font-bold text-xl tracking-tight mb-6">Recent Activity</h3>
                  <div className="space-y-6">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-4 items-start">
                        <div className="w-2 h-2 rounded-full bg-accent mt-2"></div>
                        <div>
                          <p className="text-sm font-bold text-primary">New order #100{i} received</p>
                          <p className="text-xs font-medium text-slate-400">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          } />
          
          <Route path="products" element={<AdminProducts />} />
          <Route path="*" element={<div className="p-8 text-center text-gray-500 mt-20">Module under development.</div>} />
        </Routes>
      </div>
    </div>
  );
}

function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiTitle, setAiTitle] = useState('');
  const [aiKeywords, setAiKeywords] = useState('');
  const [generatedDesc, setGeneratedDesc] = useState('');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(console.error);
  }, []);

  const handleGenerate = async () => {
    if (!aiTitle) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: aiTitle, keywords: aiKeywords })
      });
      const data = await res.json();
      if (data.description) {
        setGeneratedDesc(data.description);
      }
    } catch (err) {
      console.error(err);
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">Products CMS</h1>
          <p className="text-slate-500 font-medium">Manage your direct and affiliate inventory.</p>
        </div>
        <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg shadow-slate-100 border-2 border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b-2 border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500">
              <tr>
                <th className="px-6 py-5">Product</th>
                <th className="px-6 py-5">Price</th>
                <th className="px-6 py-5">Type</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-50">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="max-w-[200px]">
                        <p className="text-sm font-bold text-primary truncate">{p.title}</p>
                        <p className="text-xs font-medium text-slate-400">{p.brand}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-primary">${p.price.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {p.isAffiliate ? <span className="bg-blue-50 text-accent px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">Affiliate</span> : <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">Direct</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                     <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">Active</span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-300 hover:text-accent transition-colors"><Edit3 className="w-5 h-5" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-slate-100 border-2 border-slate-100 p-8 flex flex-col h-fit">
          <div className="flex items-center gap-2 mb-6 text-accent">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-xl tracking-tight text-primary">AI Description</h3>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Product Title</label>
              <input 
                type="text" 
                value={aiTitle}
                onChange={e => setAiTitle(e.target.value)}
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. Minimalist Leather Bag"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Keywords</label>
              <input 
                type="text" 
                value={aiKeywords}
                onChange={e => setAiKeywords(e.target.value)}
                className="w-full border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent transition-colors"
                placeholder="e.g. durable, commute, stylish"
              />
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !aiTitle}
              className="w-full bg-accent text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-200 mt-2"
            >
              {isGenerating ? 'Generating...' : 'Generate with Gemini AI'}
            </button>
            
            {generatedDesc && (
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Generated Output</label>
                <div className="p-5 bg-slate-50 rounded-xl text-sm text-primary font-medium whitespace-pre-wrap border-2 border-slate-100">
                  {generatedDesc}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
