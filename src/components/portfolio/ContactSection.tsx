import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  Send,
  Check,
  Copy,
  ArrowUpRight,
} from 'lucide-react';
import { ContactSettings } from '../../types/portfolio';

interface ContactSectionProps {
  contact: ContactSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ contact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectLine = `${contact.inquirySubjectPrefix || '[Inquiry]'} ${formData.subject || 'Portfolio Inquiry'}`;
    const bodyContent = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;

    // Construct mailto URL to send directly to the configured recipient email
    const mailtoUrl = `mailto:${contact.recipientEmail}?subject=${encodeURIComponent(
      subjectLine
    )}&body=${encodeURIComponent(bodyContent)}`;

    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const copyInquiryToClipboard = () => {
    const textToCopy = `To: ${contact.recipientEmail}\nSubject: ${contact.inquirySubjectPrefix} ${formData.subject}\nFrom: ${formData.name} (${formData.email})\n\n${formData.message}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-neutral-900 bg-neutral-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/60 text-blue-400 text-xs font-mono tracking-wider uppercase">
            Get In Touch
          </div>
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Connect & Collaborate
          </h2>
          <p className="text-neutral-400 max-w-2xl text-base sm:text-lg">
            Have an open role, engineering challenge, or collaboration in mind? Send an inquiry directly to my inbox.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/90 space-y-6">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Direct Contact Channels
              </h3>

              {contact.availabilityNote && (
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-300">
                  {contact.availabilityNote}
                </div>
              )}

              <div className="space-y-4">
                {/* Email */}
                {contact.recipientEmail && (
                  <a
                    id="contact-channel-email"
                    href={`mailto:${contact.recipientEmail}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-black border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-900 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-neutral-400">Direct Email</div>
                      <div className="text-sm font-semibold text-white truncate group-hover:text-blue-300">
                        {contact.recipientEmail}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 shrink-0" />
                  </a>
                )}

                {/* Phone */}
                {contact.phone && (
                  <a
                    id="contact-channel-phone"
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-black border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-900 transition-all group"
                  >
                    <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400 group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-mono text-neutral-400">Phone / WhatsApp</div>
                      <div className="text-sm font-semibold text-white truncate group-hover:text-blue-300">
                        {contact.phone}
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-blue-400 shrink-0" />
                  </a>
                )}

                {/* Location */}
                {contact.location && (
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-black border border-neutral-800">
                    <div className="p-2.5 rounded-lg bg-blue-950/60 text-blue-400">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-neutral-400">Location</div>
                      <div className="text-sm font-semibold text-white">
                        {contact.location}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profiles */}
              <div className="pt-4 border-t border-neutral-800">
                <div className="text-xs font-mono text-neutral-400 mb-3">Professional Profiles</div>
                <div className="flex flex-wrap gap-2.5">
                  {contact.linkedinUrl && (
                    <a
                      id="contact-profile-linkedin"
                      href={contact.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 hover:border-blue-500/50 text-neutral-200 hover:text-blue-300 text-xs font-medium transition-colors"
                    >
                      <Linkedin className="w-4 h-4 text-blue-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {contact.githubUrl && (
                    <a
                      id="contact-profile-github"
                      href={contact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 hover:border-blue-500/50 text-neutral-200 hover:text-blue-300 text-xs font-medium transition-colors"
                    >
                      <Github className="w-4 h-4 text-blue-400" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {contact.websiteUrl && (
                    <a
                      id="contact-profile-website"
                      href={contact.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-neutral-800 hover:border-blue-500/50 text-neutral-200 hover:text-blue-300 text-xs font-medium transition-colors"
                    >
                      <Globe className="w-4 h-4 text-blue-400" />
                      <span>Website</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800/90">
              <h3 className="text-xl font-bold text-white tracking-tight mb-2">
                Send Direct Email Inquiry
              </h3>
              <p className="text-neutral-400 text-sm mb-6">
                Fill in the details below to dispatch your message straight to{' '}
                <span className="text-blue-400 font-mono font-medium">{contact.recipientEmail}</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-form-name"
                      className="block text-xs font-mono text-neutral-200 mb-1.5"
                    >
                      Your Name *
                    </label>
                    <input
                      id="contact-form-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 text-sm transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-form-email"
                      className="block text-xs font-mono text-neutral-200 mb-1.5"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-form-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 text-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-form-subject"
                    className="block text-xs font-mono text-neutral-200 mb-1.5"
                  >
                    Subject *
                  </label>
                  <input
                    id="contact-form-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Job Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 text-sm transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-form-message"
                    className="block text-xs font-mono text-neutral-200 mb-1.5"
                  >
                    Message Details *
                  </label>
                  <textarea
                    id="contact-form-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or position requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-blue-400 text-sm transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="contact-form-submit-btn"
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md shadow-blue-600/30 transition-all active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to {contact.recipientEmail}</span>
                  </button>

                  <button
                    id="contact-form-copy-btn"
                    type="button"
                    onClick={copyInquiryToClipboard}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white border border-neutral-800 text-xs font-medium transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-blue-400" />
                        <span className="text-blue-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>
                </div>

                {submitted && (
                  <div
                    id="contact-form-success-banner"
                    className="p-4 rounded-xl bg-blue-950/50 border border-blue-800/60 text-blue-200 text-xs leading-relaxed mt-4 flex items-start gap-2.5"
                  >
                    <Check className="w-4 h-4 shrink-0 mt-0.5 text-blue-400" />
                    <div>
                      <strong>Email Client Triggered:</strong> Your default email software was launched with your inquiry directed to{' '}
                      <span className="underline font-mono">{contact.recipientEmail}</span>. You can also copy your message above if needed.
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
