
import React from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { settings, pages } = useApp();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
             <h3 className="text-white text-xl font-bold">{settings.siteName}</h3>
             <p className="text-sm leading-relaxed">
               {settings.slogan}. भारत की सबसे भरोसेमंद सरकारी नौकरी पोर्टल जहाँ आपको मिलते हैं लेटेस्ट रिजल्ट, एडमिट कार्ड और वैकेंसी की सटीक जानकारी।
             </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><a href="#" className="hover:text-white transition">Latest Jobs</a></li>
              <li><a href="#" className="hover:text-white transition">Results</a></li>
              <li><a href="#" className="hover:text-white transition">Syllabus</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Policy Pages</h4>
            <ul className="space-y-2 text-sm">
               {pages.map(page => (
                 <li key={page.id}><Link to={`/page/${page.slug}`} className="hover:text-white transition">{page.title}</Link></li>
               ))}
               <li><a href="#" className="hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Connect With Us</h4>
            <div className="flex gap-4">
              {settings.socialLinks.map((link, idx) => (
                <a key={idx} href={link.url} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                   <span className="text-[10px] font-bold">{link.platform[0]}</span>
                </a>
              ))}
            </div>
            <p className="mt-6 text-xs text-gray-500">Global Reach: Accessible from anywhere in the world.</p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. All Rights Reserved.</p>
          <p className="mt-2 text-gray-600">Powered by Gemini AI Engine</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
