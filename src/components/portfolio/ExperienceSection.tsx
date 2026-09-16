import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { ExperienceItem } from '../../types/portfolio';

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experience }) => {
  return (
    <section id="experience" className="py-24 relative border-t border-neutral-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono tracking-wider uppercase">
            Career Journey
          </div>
          <h2 id="experience-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Experience
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
            Direct production experience building robust, AI-integrated business software and automated backends.
          </p>
        </div>

        <div className="relative border-l border-neutral-800 ml-4 sm:ml-6 space-y-12">
          {experience.map((exp, index) => (
            <div key={exp.id || index} id={`experience-card-${exp.id}`} className="relative pl-8 sm:pl-10 group">
              {/* Timeline Marker */}
              <div className="absolute -left-[17px] top-1.5 h-8 w-8 rounded-full bg-black border-2 border-blue-500 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:border-blue-400 group-hover:shadow-blue-500/40 transition-all shadow-md shadow-blue-500/20">
                <Briefcase className="w-3.5 h-3.5" />
              </div>

              {/* Content Card */}
              <div className="bg-neutral-900/50 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 hover:border-blue-900/80 hover:bg-neutral-900/70 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.title}
                    </h3>
                    <div className="text-blue-400 font-medium text-base">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-400 font-mono">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black border border-neutral-800 text-neutral-300">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-black border border-neutral-800 text-neutral-300">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {exp.location}
                      </span>
                    )}
                    {exp.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-700/60">
                        Present
                      </span>
                    )}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-3 mb-6">
                  {exp.responsibilities.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-neutral-300 text-sm sm:text-base leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral-800">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-black text-neutral-200 text-xs font-mono border border-neutral-800"
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
