
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Lock, ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setIsAdmin, settings } = useApp();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Compare against saved password in settings (default admin123 if not set)
    if (password === (settings.adminPassword || 'admin123')) {
      setIsAdmin(true);
      navigate('/admin');
    } else {
      setError('गलत पासवर्ड! कृपया सही पासवर्ड दर्ज करें।');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center">
        <button 
          onClick={() => navigate('/')} 
          className="mb-6 flex items-center gap-2 text-gray-500 hover:text-blue-700 transition font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> वापस मुख्य साइट पर जाएं
        </button>
        <div className="bg-white p-2 rounded-xl shadow-sm border mb-4">
           <img src={settings.logoUrl} alt="Logo" className="h-10 w-auto object-contain" />
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl border w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-200">
            <Lock className="w-8 h-8 text-blue-800" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Admin Login</h1>
          <p className="text-sm text-gray-500 mt-1 uppercase font-bold tracking-widest">{settings.siteName}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">एडमिन पासवर्ड</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none" 
                placeholder="पासवर्ड यहाँ लिखें..."
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-xs font-bold text-center border border-red-100">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-blue-800 text-white py-4 rounded-xl font-black shadow-lg hover:bg-blue-900 transition-all transform active:scale-95 uppercase tracking-wider"
          >
            लॉगिन करें (Access Panel)
          </button>
        </form>
        
        <p className="mt-8 text-center text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
          सुरक्षा कारणों से लॉगिन विवरण गुप्त रखें।
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
