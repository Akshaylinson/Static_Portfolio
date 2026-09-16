import React from 'react';
import { Cpu, Code2, ShieldCheck, Languages, CheckCircle2 } from 'lucide-react';
import { AboutData } from '../../types/portfolio';

interface AboutSectionProps {
  about: AboutData;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ about }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-blue-400" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-sky-400" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-indigo-400" />;
      default:
        return <CheckCircle2 className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-24 relative border-t border-neutral-900 bg-neutral-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono tracking-wider uppercase">
            Engineering Profile
          </div>
          <h2 id="about-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-neutral-400 max-w-3xl text-base sm:text-lg">
            Engineering intelligent, software-first systems with reliable logic, resilient backends, and modern interfaces.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Story / Bio */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base sm:text-lg leading-relaxed">
            {about.bioParagraphs && about.bioParagraphs.length > 0 ? (
              about.bioParagraphs.map((paragraph, index) => (
                <p key={index} id={`about-bio-p-${index}`}>
                  {paragraph}
                </p>
              ))
            ) : (
              <p id="about-bio-fallback">{about.summary}</p>
            )}

            {/* Spoken Languages */}
            {about.languages && about.languages.length > 0 && (
              <div id="about-languages-card" className="pt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <div className="flex items-center gap-2 text-neutral-400 font-mono text-sm">
                  <Languages className="w-4 h-4 text-blue-400" />
                  <span>Languages:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {about.languages.map((lang) => (
                    <span
                      key={lang}
                      className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-200 text-xs font-medium"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Highlights / Pillars */}
          <div className="lg:col-span-5 space-y-4">
            {about.highlights?.map((item, idx) => (
              <div
                key={idx}
                id={`about-highlight-${idx}`}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 hover:border-blue-900/80 hover:bg-neutral-900/80 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-neutral-800 border border-neutral-700/60 shrink-0">
                    {getIcon(item.icon)}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white text-base tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
