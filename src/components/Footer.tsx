
import { Link } from 'react-router-dom';
import { GraduationCap, Instagram, Twitter, Facebook, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-border">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-primary">Career Craftor</span>
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              Empowering students and graduates to craft their ideal career path
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Features</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/careers" className="text-sm text-gray-500 hover:text-gray-900">
                  Career Explorer
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-sm text-gray-500 hover:text-gray-900">
                  Skill Gap Analysis
                </Link>
              </li>
              <li>
                <Link to="/resume" className="text-sm text-gray-500 hover:text-gray-900">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/interview" className="text-sm text-gray-500 hover:text-gray-900">
                  Interview Preparation
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/community" className="text-sm text-gray-500 hover:text-gray-900">
                  Q&A Community
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-500 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Career Craftor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
