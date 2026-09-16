import React from 'react';
import { Terminal, Users, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '../../types/portfolio';

interface SkillsSectionProps {
  skillCategories: SkillCategory[];
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skillCategories }) => {
  return (
    <section id="skills" className="py-24 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono tracking-wider uppercase">
            Capabilities
          </div>
          <h2 id="skills-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Skills & Competencies
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg">
            Engineering stack, operational methodologies, and cross-functional competencies applied across production projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((group, idx) => (
            <div
              key={group.category || idx}
              id={`skill-category-${idx}`}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400">
                  {idx === 0 ? <Terminal className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {group.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm font-medium hover:border-teal-500/40 hover:text-teal-300 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
