import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { Menu, X, Heart, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { EditableText } from './Editable';
import { Logo } from './Logo';

const Navbar = () => {
  const { config } = useSite();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <Logo className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
            <div className="flex flex-col leading-tight">
               <span className="text-primary font-bold text-xl tracking-tight uppercase leading-none">Safe Water</span>
               <span className="text-xs text-gray-500 font-medium tracking-widest">ORGANISATION</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `text-sm font-medium transition-colors ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/donate"
              className="bg-primary text-white px-5 py-2.5 rounded-full font-semibold shadow-lg hover:bg-primary/90 transition-transform transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <Heart size={18} fill="currentColor" /> Donate
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => 
                  `block px-3 py-3 rounded-md text-base font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-50'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
             <NavLink
              to="/donate"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-center mt-4 bg-primary text-white px-5 py-3 rounded-lg font-bold"
            >
              Donate Now
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const { config } = useSite();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
               <Logo className="h-8 w-8 text-primary" tone="color" />
               <span className="text-xl font-bold tracking-tight text-white">{config.branding.name}</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              {config.branding.tagline}
            </p>
            <div className="flex space-x-4">
               {/* Social Icons - In a real app these would be mapped from config */}
               <a href={config.social.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
               <a href={config.social.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
               <a href={config.social.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
               <a href={config.social.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><NavLink to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</NavLink></li>
              <li><NavLink to="/projects" className="text-gray-400 hover:text-white transition-colors">Our Projects</NavLink></li>
              <li><NavLink to="/blog" className="text-gray-400 hover:text-white transition-colors">Latest News</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <p>{config.contact.address}</p>
              <p>{config.contact.phone}</p>
              <p>{config.contact.email}</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">
              <EditableText contentKey="newsletterTitle" as="span" />
            </h4>
            <p className="text-gray-400 mb-4 text-sm">
              <EditableText contentKey="newsletterText" as="span" />
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded px-4 py-2 focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-2 rounded transition-colors"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div><EditableText contentKey="footerText" /></div>
          <div className="mt-4 md:mt-0">
            <Link to="/admin" className="hover:text-white transition-colors opacity-50 hover:opacity-100">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  const { config } = useSite();
  const location = useLocation();

  // Update Page Title
  React.useEffect(() => {
    document.title = config.seo.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', config.seo.metaDescription);
    }
  }, [config.seo, location]);

  return (
    <div className="min-h-screen flex flex-col bg-surface text-text">
      {/* Inject CSS Variables */}
      <style>{`
        :root {
          --color-primary: ${config.theme.primaryColor};
          --color-secondary: ${config.theme.secondaryColor};
          --color-surface: ${config.theme.surfaceColor};
          --color-text: ${config.theme.textColor};
        }
      `}</style>
      
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
