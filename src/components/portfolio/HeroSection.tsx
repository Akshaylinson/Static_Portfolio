import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Globe,
  ArrowRight,
  Sparkles,
  Download,
} from 'lucide-react';
import { HeroData } from '../../types/portfolio';

interface HeroSectionProps {
  hero: HeroData;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ hero }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-black"
    >
      {/* Subtle Navy / Blue Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            {/* Status Pill */}
            {hero.statusBadge && (
              <div
                id="hero-status-badge"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900/90 border border-blue-500/30 text-blue-300 text-xs font-medium backdrop-blur-sm shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span>{hero.statusBadge}</span>
              </div>
            )}

            {/* Name & Title */}
            <div className="space-y-3">
              <h1
                id="hero-name-heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
              >
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500">{hero.name}</span>
              </h1>
              <div
                id="hero-title-subheading"
                className="text-xl sm:text-2xl font-semibold text-neutral-200 font-mono flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
                <span>{hero.title}</span>
              </div>
            </div>

            {/* Elevator pitch */}
            <p
              id="hero-summary-paragraph"
              className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl"
            >
              {hero.summary}
            </p>

            {/* Contact metadata pills */}
            <div id="hero-quick-meta" className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-200">
              {hero.location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {hero.location}
                </span>
              )}
              {hero.email && (
                <a
                  href={`mailto:${hero.email}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  {hero.email}
                </a>
              )}
              {hero.phone && (
                <a
                  href={`tel:${hero.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-400" />
                  {hero.phone}
                </a>
              )}
            </div>

            {/* Action buttons & Socials */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full">
              <a
                id="hero-cta-projects"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                id="hero-cta-contact"
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 font-semibold text-sm transition-all hover:border-neutral-500"
              >
                <span>Get In Touch</span>
              </a>
              <a
                id="hero-cta-resume"
                href={hero.resumeUrl && hero.resumeUrl !== '#contact' ? hero.resumeUrl : '/resume.pdf'}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-sm font-medium transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-4 h-4 text-blue-400" />
                <span>CV</span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-2 sm:ml-auto pt-2 sm:pt-0">
                {hero.githubUrl && (
                  <a
                    id="hero-social-github"
                    href={hero.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-blue-400 border border-neutral-800 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {hero.linkedinUrl && (
                  <a
                    id="hero-social-linkedin"
                    href={hero.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-blue-400 border border-neutral-800 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {hero.websiteUrl && (
                  <a
                    id="hero-social-website"
                    href={hero.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-blue-400 border border-neutral-800 transition-colors"
                    aria-label="Personal Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Avatar Graphic / Image Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative group w-72 sm:w-80 lg:w-96 aspect-square">
              {/* Subtle back decorative frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 to-indigo-600/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300 -z-10" />

              <div className="w-full h-full rounded-3xl p-2 bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800/90 shadow-2xl overflow-hidden flex flex-col justify-between">
                {hero.avatarUrl ? (
                  <img
                    id="hero-avatar-image"
                    src={hero.avatarUrl}
                    alt={hero.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-2xl filter brightness-[0.98] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback if image fails
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-neutral-900 flex items-center justify-center font-mono text-5xl font-bold text-blue-400">
                    ALM
                  </div>
                )}

                {/* Floating badge */}
                <div className="absolute -bottom-4 -left-4 sm:left-2 bg-black/95 border border-neutral-800 px-4 py-2.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-sm shadow-blue-500/50" />
                  <div>
                    <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Current Focus</div>
                    <div className="text-xs font-semibold text-white">AI Agents & Full-Stack Systems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
