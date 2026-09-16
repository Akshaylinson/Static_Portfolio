import React, { useState } from 'react';
import { ExternalLink, Github, Sparkles, FolderCode } from 'lucide-react';
import { ProjectItem } from '../../types/portfolio';

interface ProjectsSectionProps {
  projects: ProjectItem[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'AI & Machine Learning', 'Full-Stack & Web', 'Mobile & Systems'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative border-t border-neutral-900 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono tracking-wider uppercase">
              Featured Work
            </div>
            <h2 id="projects-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Highlighted Projects
            </h2>
            <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
              Production systems, intelligent automation pipelines, and scalable enterprise applications.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                id={`project-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30'
                    : 'bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="rounded-2xl bg-neutral-900/50 border border-neutral-800/90 hover:border-blue-900/80 hover:bg-neutral-900/70 p-6 sm:p-8 flex flex-col justify-between group transition-all"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="px-2.5 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sky-300 bg-blue-950/80 border border-blue-700/60 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3 text-sky-400" />
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors mb-2">
                  {project.title}
                </h3>

                {project.subtitle && (
                  <h4 className="text-sm font-mono text-blue-400/90 mb-4">
                    {project.subtitle}
                  </h4>
                )}

                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-neutral-800">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-black text-neutral-200 text-xs font-mono border border-neutral-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      id={`project-github-${project.id}`}
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white border border-neutral-800 text-xs font-medium transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-blue-400" />
                      <span>Code / Repo</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      id={`project-live-${project.id}`}
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 text-xs font-medium transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Project Link</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
