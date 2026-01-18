
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StaticPageContent: React.FC = () => {
  const { slug } = useParams();
  const { pages } = useApp();
  const page = pages.find(p => p.slug === slug);

  if (!page) return <div className="text-center py-20">Page Not Found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white p-8 rounded-2xl border shadow-sm">
          <h1 className="text-4xl font-black mb-8 border-b pb-4">{page.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {page.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaticPageContent;
