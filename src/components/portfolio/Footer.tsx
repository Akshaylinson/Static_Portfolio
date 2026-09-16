import React from 'react';
import { HeroData } from '../../types/portfolio';
import { Github, Linkedin, Globe, ArrowUp } from 'lucide-react';

interface FooterProps {
  hero: HeroData;
}

export const Footer: React.FC<FooterProps> = ({ hero }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="portfolio-footer" className="border-t border-slate-900 bg-slate-950 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">{hero.name}</span>
              <span className="text-slate-500 font-mono text-xs">/</span>
              <span className="text-xs font-mono text-teal-400">{hero.title}</span>
            </div>
            <p className="text-xs text-slate-500">
              Static Portfolio Architecture • Built with React, Tailwind CSS & JSON
            </p>
          </div>

          {/* Socials & Scroll to Top */}
          <div className="flex items-center gap-4">
            {hero.githubUrl && (
              <a
                href={hero.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-teal-400 border border-slate-800 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {hero.linkedinUrl && (
              <a
                href={hero.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-teal-400 border border-slate-800 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {hero.websiteUrl && (
              <a
                href={hero.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-teal-400 border border-slate-800 transition-colors"
                aria-label="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}

            <button
              id="scroll-to-top-btn"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors ml-2"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimal discreet admin shortcut note in footer */}
        <div className="mt-8 pt-6 border-t border-slate-900/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2 font-mono">
          <div>© {new Date().getFullYear()} {hero.name}. All rights reserved.</div>
          <div className="text-slate-600 hover:text-slate-500 transition-colors">
            Admin console accessible via <code className="text-slate-500">#/admin</code>
          </div>
        </div>
      </div>
    </footer>
  );
};
