import React from 'react';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import { EducationItem } from '../../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({ education }) => {
  return (
    <section id="education" className="py-24 relative border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono tracking-wider uppercase">
            Academic Background
          </div>
          <h2 id="education-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Education
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Core Computer Science engineering foundation and software development fundamentals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((item, idx) => (
            <div
              key={item.id || idx}
              id={`education-card-${item.id}`}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                    <Calendar className="w-3.5 h-3.5 text-teal-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {item.degree}
                </h3>
                <div className="text-base text-teal-400 font-medium mb-3">
                  {item.institution}
                </div>

                {item.location && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono mb-4">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    <span>{item.location}</span>
                  </div>
                )}

                {item.details && item.details.length > 0 && (
                  <ul className="space-y-2 text-slate-300 text-sm leading-relaxed pt-2 border-t border-slate-800/70">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2">
                        <Award className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-1" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
