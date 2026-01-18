
import React from 'react';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { CATEGORIES } from './constants';
import { 
  Home as HomeIcon, 
  Settings as SettingsIcon, 
  FileText, 
  PlusCircle, 
  Archive, 
  CheckCircle,
  Layout,
  LogIn,
  Search,
  Zap,
  BookOpen
} from 'lucide-react';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import Marquee from './components/Marquee';

// Pages
import HomePage from './pages/HomePage';
import PostDetailPage from './pages/PostDetailPage';
import LoginPage from './pages/LoginPage';
import StaticPageContent from './pages/StaticPageContent';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import PostGenerator from './pages/admin/PostGenerator';
import ManagePosts from './pages/admin/ManagePosts';
import SiteSettingsPage from './pages/admin/SiteSettings';
import StaticPagesManager from './pages/admin/StaticPagesManager';
import BlogManager from './pages/admin/BlogManager';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAdmin, settings } = useApp();

  if (!isAdmin) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: settings.primaryColor }}>
            <Zap className="w-6 h-6" /> Admin Panel
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <Layout className="w-5 h-5" /> Dashboard
          </Link>
          <Link to="/admin/generate" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <Zap className="w-5 h-5" /> AI Generator
          </Link>
          <Link to="/admin/posts" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <Archive className="w-5 h-5" /> Manage Posts
          </Link>
          <Link to="/admin/blogs" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <BookOpen className="w-5 h-5" /> Blogs
          </Link>
          <Link to="/admin/pages" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <FileText className="w-5 h-5" /> Static Pages
          </Link>
          <Link to="/admin/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
            <SettingsIcon className="w-5 h-5" /> Site Settings
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition border-t mt-4">
            <HomeIcon className="w-5 h-5" /> Back to Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Visitor Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/page/:slug" element={<StaticPageContent />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      <Route path="/admin/generate" element={<AdminLayout><PostGenerator /></AdminLayout>} />
      <Route path="/admin/posts" element={<AdminLayout><ManagePosts /></AdminLayout>} />
      <Route path="/admin/settings" element={<AdminLayout><SiteSettingsPage /></AdminLayout>} />
      <Route path="/admin/pages" element={<AdminLayout><StaticPagesManager /></AdminLayout>} />
      <Route path="/admin/blogs" element={<AdminLayout><BlogManager /></AdminLayout>} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
};

export default App;
