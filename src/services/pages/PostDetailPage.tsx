
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Added Zap to the imported icons
import { Calendar, Info, HelpCircle, Download, ExternalLink, ArrowLeft, Zap } from 'lucide-react';

const PostDetailPage: React.FC = () => {
  const { id } = useParams();
  const { posts, settings } = useApp();
  const post = posts.find(p => p.id === id);

  if (!post) return <div className="text-center py-20">Post Not Found</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-600 mb-6 hover:text-blue-700">
           <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="bg-white border rounded shadow-sm overflow-hidden">
          {/* Main Title Section */}
          <div className="p-6 border-b text-center" style={{ borderBottomColor: settings.primaryColor }}>
            <h1 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">{post.hindiTitle || post.title}</h1>
            <p className="text-lg font-bold text-gray-700 uppercase">{post.title}</p>
          </div>

          <div className="p-4 md:p-8">
            {/* Quick Summary / Description */}
            <div className="mb-10">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 p-2 bg-gray-100 rounded">
                <Info className="w-5 h-5 text-blue-700" /> महत्वपूर्ण विवरण (Description)
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {post.description}
              </div>
            </div>

            {/* Dates & Fees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-blue-800 text-white px-4 py-2 font-bold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> महत्वपूर्ण तिथियाँ (Important Dates)
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {post.importantDates.map((d, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 font-bold bg-gray-50 border-r w-1/2">{d.label}</td>
                        <td className="px-4 py-2">{d.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-red-600 text-white px-4 py-2 font-bold flex items-center gap-2">
                  <Info className="w-4 h-4" /> आवेदन शुल्क (Application Fee)
                </div>
                <table className="w-full text-sm">
                  <tbody>
                    {post.fees.map((f, i) => (
                      <tr key={i} className="border-b last:border-0">
                        <td className="px-4 py-2 font-bold bg-gray-50 border-r w-1/2">{f.label}</td>
                        <td className="px-4 py-2">{f.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Age Limit */}
            <div className="mb-10 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <h3 className="font-bold text-gray-900 mb-1">आयु सीमा (Age Limit)</h3>
              <p className="text-sm text-gray-700">{post.ageLimit}</p>
            </div>

            {/* Vacancy Details & Eligibility */}
            <div className="mb-10">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 p-2 bg-gray-100 rounded">
                <Zap className="w-5 h-5 text-green-700" /> वैकेंसी विवरण और पात्रता (Vacancy Details & Eligibility)
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.vacancyDetails}
                <div className="mt-6 p-4 border rounded bg-blue-50">
                  <h4 className="font-bold mb-2">पात्रता विवरण:</h4>
                  {post.eligibility}
                </div>
              </div>
            </div>

            {/* How to Apply */}
            <div className="mb-10">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 p-2 bg-gray-100 rounded">
                <HelpCircle className="w-5 h-5 text-purple-700" /> आवेदन कैसे करें (How to Apply / Check)
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
                {post.howTo}
              </div>
            </div>

            {/* Important Links Table */}
            <div className="mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4 p-2 bg-gray-100 rounded">
                <ExternalLink className="w-5 h-5 text-red-600" /> महत्वपूर्ण लिंक (Important Links)
              </h2>
              <table className="w-full border rounded text-center text-sm font-bold">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-4 py-3 border">Link Description</th>
                    <th className="px-4 py-3 border">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {post.links.map((link, i) => (
                    <tr key={i} className="border-b">
                      <td className="px-4 py-4 border uppercase text-red-600">{link.label}</td>
                      <td className="px-4 py-4 border">
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-700 text-white px-6 py-2 rounded shadow hover:bg-blue-800 transition uppercase"
                        >
                          Click Here
                        </a>
                      </td>
                    </tr>
                  ))}
                  <tr className="border-b">
                    <td className="px-4 py-4 border uppercase text-green-700">Official Website</td>
                    <td className="px-4 py-4 border">
                      <button className="bg-green-700 text-white px-6 py-2 rounded shadow hover:bg-green-800 transition uppercase">
                        Visit Site
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostDetailPage;
