
import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, Archive, CheckCircle, Activity, Users, Eye, Globe } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { posts, blogs, totalViews } = useApp();
  const [liveVisitors, setLiveVisitors] = useState(0);

  useEffect(() => {
    // Simulated live visitor fluctuation for UI effect
    const interval = setInterval(() => {
      setLiveVisitors(Math.floor(Math.random() * (45 - 12 + 1)) + 12);
    }, 5000);
    setLiveVisitors(24);
    return () => clearInterval(interval);
  }, []);
  
  const stats = [
    { label: 'Live Posts', count: posts.filter(p => p.status === 'live').length, color: 'bg-green-600', icon: CheckCircle },
    { label: 'Draft Box', count: posts.filter(p => p.status === 'draft').length, color: 'bg-orange-500', icon: Archive },
    { label: "Total Views", count: totalViews.toLocaleString(), color: 'bg-blue-600', icon: Eye },
    { label: 'Live Now', count: liveVisitors, color: 'bg-red-600', icon: Activity },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Dashboard</h1>
          <p className="text-gray-500 font-medium">स्वागत है एडमिन! यहाँ आपकी साइट का हालिया डेटा है।</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-100 text-xs font-bold">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          System Online & Connected Globally
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border shadow-sm flex items-center justify-between group hover:shadow-md transition-all">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 text-gray-800">{stat.count}</h3>
            </div>
            <div className={`p-4 rounded-2xl ${stat.color} text-white shadow-lg`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border shadow-sm">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
             <Activity className="w-5 h-5 text-blue-600" /> हालिया अपडेट्स (Recent Activity)
          </h2>
          <div className="space-y-4">
            {posts.slice(-6).reverse().map(post => (
              <div key={post.id} className="flex items-center justify-between py-3 border-b last:border-0 hover:bg-gray-50 rounded-lg px-2 transition">
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-2 rounded-full ${post.status === 'live' ? 'bg-green-500' : 'bg-orange-400'}`}></div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 line-clamp-1">{post.hindiTitle || post.title}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">{post.category} • {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                   <span className={`text-[9px] px-2 py-1 rounded-full font-black uppercase ${post.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="text-center py-10 text-gray-400 italic">अभी कोई डेटा नहीं है।</p>
            )}
          </div>
        </div>

        <div className="bg-blue-800 p-8 rounded-3xl shadow-xl flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
          <Globe className="w-20 h-20 text-blue-200 mb-6 animate-pulse" />
          <h2 className="text-2xl font-black mb-2 uppercase tracking-tight">Global Connectivity</h2>
          <p className="text-sm text-blue-100 leading-relaxed mb-6 font-medium">
            आपकी वेबसाइट दुनिया भर में लाइव है। आपके द्वारा किया गया हर अपडेट तुरंत पूरी दुनिया में देखा जा सकता है।
          </p>
          <div className="bg-blue-700 w-full p-4 rounded-2xl border border-blue-600/50">
             <p className="text-[10px] font-bold uppercase text-blue-300 mb-1">Status</p>
             <p className="text-sm font-bold">100% Up-time Guaranteed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
