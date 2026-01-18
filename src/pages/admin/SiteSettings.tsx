
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Save, Palette, Globe, Shield, Lock, Image as ImageIcon, CheckCircle } from 'lucide-react';

const SiteSettingsPage: React.FC = () => {
  const { settings, setSettings } = useApp();
  const [passVisible, setPassVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setSettings(prev => ({ ...prev, [name]: val }));
  };

  const handleSave = () => {
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Site Settings</h1>
          <p className="text-gray-500 font-medium">अपनी वेबसाइट की ब्रांडिंग और सुरक्षा को यहाँ से कंट्रोल करें।</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-4 bg-blue-800 text-white rounded-2xl font-black shadow-xl hover:bg-blue-900 transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-wider"
        >
          {saveStatus ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saveStatus ? "Saved!" : "सभी बदलाव सेव करें"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Identity & Logo */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-blue-700 uppercase tracking-tight">
              <ImageIcon className="w-6 h-6" /> Logo & Identity
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Website Name</label>
                <input 
                  name="siteName" 
                  value={settings.siteName} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 font-bold text-gray-800" 
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Tagline / Slogan</label>
                <input 
                  name="slogan" 
                  value={settings.slogan} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-gray-700" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Website Logo URL</label>
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <input 
                    name="logoUrl" 
                    value={settings.logoUrl} 
                    onChange={handleChange} 
                    placeholder="https://example.com/logo.png"
                    className="flex-1 p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 text-sm" 
                  />
                  <div className="h-16 w-32 bg-gray-100 rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden p-2">
                    {settings.logoUrl ? (
                      <img src={settings.logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="text-[8px] text-gray-400 font-bold">NO LOGO</span>
                    )}
                  </div>
                </div>
                <p className="text-[9px] text-gray-400 font-medium italic">परामर्श: 200x50 px का पारदर्शी (Transparent) लोगो सबसे अच्छा दिखेगा।</p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-orange-600 uppercase tracking-tight">
              <Lock className="w-6 h-6" /> Admin Security
            </h2>
            <div className="space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Change Login Password</label>
                  <div className="relative">
                    <input 
                      type={passVisible ? "text" : "password"} 
                      name="adminPassword" 
                      value={settings.adminPassword || 'admin123'} 
                      onChange={handleChange} 
                      className="w-full p-3 bg-gray-50 border rounded-xl pr-14 font-black tracking-widest focus:ring-2 focus:ring-orange-500" 
                    />
                    <button 
                      type="button"
                      onClick={() => setPassVisible(!passVisible)}
                      className="absolute right-3 top-3 px-2 py-1 bg-white border rounded-lg text-[10px] font-bold text-orange-600 shadow-sm"
                    >
                      {passVisible ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">यह आपका मास्टर पासवर्ड है। इसे सुरक्षित रखें।</p>
               </div>

               <div className="flex items-center justify-between p-5 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <div>
                     <p className="font-black text-sm text-gray-800 uppercase tracking-tight">Copy Protection</p>
                     <p className="text-[10px] text-gray-500 font-medium">साइट का डेटा चोरी होने (Copy-Paste) से बचाएं।</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="copyProtection" 
                      checked={settings.copyProtection} 
                      onChange={handleChange} 
                      className="sr-only peer" 
                    />
                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-orange-600"></div>
                  </label>
               </div>
            </div>
          </section>
        </div>

        {/* Branding & Social */}
        <div className="space-y-8">
          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-red-600 uppercase tracking-tight">
              <Palette className="w-6 h-6" /> Branding & Theme
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Primary Color (Header)</label>
                <div className="flex gap-4">
                  <input type="color" name="primaryColor" value={settings.primaryColor} onChange={handleChange} className="w-12 h-12 border-4 border-white shadow-md rounded-xl cursor-pointer" />
                  <input value={settings.primaryColor} onChange={handleChange} name="primaryColor" className="flex-1 p-3 bg-gray-50 border rounded-xl font-mono text-xs uppercase" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-1">Accent Color (Buttons)</label>
                <div className="flex gap-4">
                  <input type="color" name="secondaryColor" value={settings.secondaryColor} onChange={handleChange} className="w-12 h-12 border-4 border-white shadow-md rounded-xl cursor-pointer" />
                  <input value={settings.secondaryColor} onChange={handleChange} name="secondaryColor" className="flex-1 p-3 bg-gray-50 border rounded-xl font-mono text-xs uppercase" />
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-3xl border shadow-sm">
            <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-green-700 uppercase tracking-tight">
              <Globe className="w-6 h-6" /> Global Social Links
            </h2>
            <div className="space-y-4">
               {settings.socialLinks.map((link, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-24 bg-gray-100 p-3 rounded-xl text-center text-xs font-black uppercase text-gray-600 border">
                      {link.platform}
                    </div>
                    <input 
                      placeholder={`Enter ${link.platform} URL`}
                      className="flex-1 p-3 bg-gray-50 border rounded-xl text-sm"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...settings.socialLinks];
                        newLinks[idx].url = e.target.value;
                        setSettings({...settings, socialLinks: newLinks});
                      }}
                    />
                 </div>
               ))}
            </div>
          </section>

          <section className="bg-gray-900 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent"></div>
             <Shield className="w-10 h-10 text-blue-400 mb-4" />
             <h3 className="text-xl font-black mb-2 uppercase italic">Global Visibility Note</h3>
             <p className="text-sm text-gray-400 font-medium leading-relaxed">
               आपकी वेबसाइट क्लाउड सर्वर पर चलने के लिए तैयार है। आपके द्वारा यहाँ किए गए सभी बदलाव पूरी दुनिया में लाइव दिखेंगे।
             </p>
             <div className="mt-6 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-green-400">Production Ready</span>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default SiteSettingsPage;
