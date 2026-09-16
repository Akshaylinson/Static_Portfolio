import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { ExperienceItem } from '../../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono tracking-wider uppercase">
            Career Journey
          </div>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Direct production experience building robust, AI-integrated business software and automated backends.
          </p>
        </div>

        <div className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-12">
          {experience.map((exp, index) => (
            <div key={exp.id || index} id={`experience-card-${exp.id}`} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Marker */}
              <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full bg-slate-950 border-2 border-teal-500/80 flex items-center justify-center text-teal-400 group-hover:scale-110 group-hover:border-teal-400 transition-all shadow-md shadow-teal-500/20">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Content Card */}
              <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-slate-700/90 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.title}
                    </h3>
                    <div className="text-teal-400 font-medium text-base">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                      <Calendar className="w-3.5 h-3.5 text-teal-400" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-950 border border-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-teal-400" />
                        {exp.location}
                      </span>
                    )}
                    {exp.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Present
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-teal-400 shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/70">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
