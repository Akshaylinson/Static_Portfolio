import React from 'react';
import { ExternalLink, Award } from 'lucide-react';
import { CertificationItem } from '../../types/portfolio';

interface CertificationsSectionProps {
  certifications: CertificationItem[];
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
  return (
    <section id="certifications" className="py-24 relative border-t border-neutral-900 bg-neutral-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono tracking-wider uppercase">
            Validated Credentials
          </div>
          <h2 id="certifications-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certifications
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
            Industry simulations, professional certifications, and technical accreditations. Click any certificate card to verify credentials.
          </p>
        </div>

        {/* Aligned in a row / responsive grid of certificate boxes */}
        <div
          id="certifications-row"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch"
        >
          {certifications.map((cert) => (
            <a
              key={cert.id}
              id={`certification-card-${cert.id}`}
              href={cert.certificateUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl bg-neutral-900/60 border border-neutral-800/90 hover:border-blue-500/50 hover:bg-neutral-900/90 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-blue-950/30 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[16/10] w-full bg-black overflow-hidden border-b border-neutral-800">
                {cert.thumbnailUrl ? (
                  <img
                    id={`cert-thumb-${cert.id}`}
                    src={cert.thumbnailUrl}
                    alt={cert.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-100"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-600">
                    <Award className="w-8 h-8 text-blue-500/40" />
                  </div>
                )}

                {/* Issuer Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-black/90 backdrop-blur-md border border-neutral-800 text-[11px] font-semibold text-blue-300 font-mono">
                    {cert.issuer}
                  </span>
                </div>

                {/* External link indicator */}
                <div className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-black/80 backdrop-blur-sm text-neutral-400 group-hover:text-blue-300 group-hover:bg-neutral-900 transition-colors">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-white text-sm leading-snug group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
                    {cert.title}
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed line-clamp-3 mb-3">
                    {cert.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <span>{cert.issueDate || 'Verified'}</span>
                  <span className="text-blue-400 font-medium group-hover:underline inline-flex items-center gap-0.5">
                    View <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
