import React, { useState } from 'react';
import {
  PortfolioData,
  ExperienceItem,
  EducationItem,
  ProjectItem,
  CertificationItem,
} from '../../types/portfolio';
import {
  Save,
  Download,
  Upload,
  Copy,
  RotateCcw,
  Eye,
  LogOut,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Award,
  Cpu,
  Mail,
  Plus,
  Trash2,
  ExternalLink,
  Check,
  AlertTriangle,
  Image as ImageIcon,
  Link2,
} from 'lucide-react';

interface AdminDashboardProps {
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  onViewPortfolio: () => void;
  onLogout: () => void;
}

type TabType =
  | 'hero'
  | 'about'
  | 'experience'
  | 'education'
  | 'projects'
  | 'certifications'
  | 'skills'
  | 'contact';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  data: initialData,
  onSave,
  onReset,
  onViewPortfolio,
  onLogout,
}) => {
  const [formData, setFormData] = useState<PortfolioData>(JSON.parse(JSON.stringify(initialData)));
  const [activeTab, setActiveTab] = useState<TabType>('hero');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Quick save helper
  const handleSave = () => {
    const updated = {
      ...formData,
      lastUpdated: new Date().toISOString().split('T')[0],
    };
    setFormData(updated);
    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Download JSON file for GitHub Pages
  const handleDownloadJson = () => {
    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy JSON to clipboard
  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(formData, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // Import JSON via file
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.hero && parsed.about && parsed.projects) {
          setFormData(parsed);
          onSave(parsed);
          alert('JSON data successfully imported and applied!');
        } else {
          alert('Invalid portfolio JSON format. Missing core sections.');
        }
      } catch (err) {
        alert('Failed to parse JSON file. Please check syntax.');
      }
    };
    reader.readAsText(file);
  };

  // Helper to read image as optimized base64 Data URL
  const readFileAsDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (!result) {
          reject(new Error('Failed to read file'));
          return;
        }

        if (file.type.startsWith('image/')) {
          const img = new Image();
          img.onload = () => {
            const MAX_WIDTH = 1200;
            const MAX_HEIGHT = 1200;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH || height > MAX_HEIGHT) {
              if (width > height) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              } else {
                width = Math.round((width * MAX_HEIGHT) / height);
                height = MAX_HEIGHT;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
              const optimizedDataUrl = canvas.toDataURL(mimeType, 0.88);
              resolve(optimizedDataUrl);
              return;
            }
            resolve(result);
          };
          img.onerror = () => resolve(result);
          img.src = result;
        } else {
          resolve(result);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ---------------- Handlers for Experience ----------------
  const handleAddExperience = () => {
    const newExp: ExperienceItem = {
      id: `exp-${Date.now()}`,
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      period: 'Month Year - Present',
      isCurrent: true,
      responsibilities: ['Responsibility or accomplishment description.'],
      technologies: ['React', 'Python'],
    };
    setFormData({
      ...formData,
      experience: [newExp, ...formData.experience],
    });
  };

  const handleUpdateExperience = (index: number, field: keyof ExperienceItem, value: any) => {
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, experience: updated });
  };

  const handleDeleteExperience = (index: number) => {
    const updated = formData.experience.filter((_, i) => i !== index);
    setFormData({ ...formData, experience: updated });
  };

  // ---------------- Handlers for Education ----------------
  const handleAddEducation = () => {
    const newEdu: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Degree Title',
      institution: 'Institution Name',
      location: 'Location',
      period: '2021 - 2024',
      details: ['Key coursework or achievements.'],
    };
    setFormData({
      ...formData,
      education: [...formData.education, newEdu],
    });
  };

  const handleUpdateEducation = (index: number, field: keyof EducationItem, value: any) => {
    const updated = [...formData.education];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, education: updated });
  };

  const handleDeleteEducation = (index: number) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  // ---------------- Handlers for Projects ----------------
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: 'New Project Title',
      subtitle: 'Short project tagline',
      description: 'Detailed description of the project, problem solved, architecture, and impact.',
      technologies: ['React', 'TypeScript', 'Node.js'],
      category: 'AI & Machine Learning',
      githubUrl: 'https://github.com/Akshaylinson',
      liveUrl: 'https://akshaylinson.in',
      featured: true,
    };
    setFormData({
      ...formData,
      projects: [newProj, ...formData.projects],
    });
  };

  const handleUpdateProject = (index: number, field: keyof ProjectItem, value: any) => {
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, projects: updated });
  };

  const handleDeleteProject = (index: number) => {
    const updated = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updated });
  };

  // ---------------- Handlers for Certifications ----------------
  const handleAddCertification = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      title: 'New Professional Certification',
      issuer: 'Issuing Organization',
      issueDate: 'Verified Credential',
      description: 'Short description of skills and topics verified by this certificate.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=500&q=80',
      certificateUrl: 'https://akshaylinson.in',
    };
    setFormData({
      ...formData,
      certifications: [...formData.certifications, newCert],
    });
  };

  const handleUpdateCertification = (index: number, field: keyof CertificationItem, value: any) => {
    const updated = [...formData.certifications];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, certifications: updated });
  };

  const handleDeleteCertification = (index: number) => {
    const updated = formData.certifications.filter((_, i) => i !== index);
    setFormData({ ...formData, certifications: updated });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-mono font-bold text-teal-300 text-xs">
            CMS
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Portfolio Content Management
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                JSON Architecture
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Static Ready • Syncs to LocalStorage & JSON file
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="admin-save-btn"
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-all active:scale-[0.98]"
          >
            {saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-slate-950" />
                <span>Saved!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </>
            )}
          </button>

          <button
            id="admin-download-json-btn"
            type="button"
            onClick={handleDownloadJson}
            title="Download updated portfolio-data.json to place in GitHub repository"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-teal-400" />
            <span>Download JSON</span>
          </button>

          <button
            id="admin-copy-json-btn"
            type="button"
            onClick={handleCopyJson}
            title="Copy raw JSON to clipboard"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedJson ? 'Copied!' : 'Copy'}</span>
          </button>

          <label
            title="Import custom JSON file"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 cursor-pointer transition-colors"
          >
            <Upload className="w-3.5 h-3.5 text-cyan-400" />
            <span>Import</span>
            <input
              type="file"
              accept=".json,application/json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>

          <button
            id="admin-view-live-btn"
            type="button"
            onClick={onViewPortfolio}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-teal-950/40 text-teal-300 border border-teal-500/30 text-xs font-medium transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Portfolio</span>
          </button>

          <button
            id="admin-logout-btn"
            type="button"
            onClick={onLogout}
            title="Log out of admin session"
            className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/40 text-slate-400 hover:text-red-400 border border-slate-700 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-slate-800 scrollbar-thin">
          {[
            { id: 'hero', label: 'Hero & Identity', icon: User },
            { id: 'about', label: 'About & Pillars', icon: FileText },
            { id: 'experience', label: 'Experience', icon: Briefcase },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'projects', label: 'Projects', icon: FolderKanban },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'skills', label: 'Skills & Stack', icon: Cpu },
            { id: 'contact', label: 'Contact & Email Routing', icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                id={`admin-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/20'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: HERO & IDENTITY */}
        {activeTab === 'hero' && (
          <div className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Hero Section Settings</h2>
              <p className="text-xs text-slate-400">Configure name, title, profile picture URL, location, and quick contact details.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Candidate Full Name</label>
                <input
                  type="text"
                  value={formData.hero.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Professional Title / Position</label>
                <input
                  type="text"
                  value={formData.hero.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Status Badge Pill</label>
                <input
                  type="text"
                  value={formData.hero.statusBadge}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, statusBadge: e.target.value },
                    })
                  }
                  placeholder="e.g. Open to AI & Full-Stack Opportunities"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Hero Summary / Bio Elevator Pitch</label>
                <textarea
                  rows={3}
                  value={formData.hero.summary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, summary: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400 resize-y"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Profile Photo Avatar</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={formData.hero.avatarUrl}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        hero: { ...formData.hero, avatarUrl: e.target.value },
                      })
                    }
                    placeholder="https://... or /certificates/photo.png or data URL"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                  />
                  <label className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer shadow-md shadow-blue-600/20 transition-all shrink-0">
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const dataUrl = await readFileAsDataUrl(file);
                          setFormData({
                            ...formData,
                            hero: { ...formData.hero, avatarUrl: dataUrl },
                          });
                        } catch (err) {
                          console.error('Failed to read photo file:', err);
                        }
                      }}
                    />
                  </label>
                </div>
                {formData.hero.avatarUrl && (
                  <div className="mt-2.5 flex items-center gap-3 p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                    <img
                      src={formData.hero.avatarUrl}
                      alt="Preview"
                      className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Avatar Image Active</div>
                      <div className="text-[11px] text-slate-400 font-mono">Live preview rendered above</div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Location</label>
                <input
                  type="text"
                  value={formData.hero.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, location: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Primary Contact Email</label>
                <input
                  type="email"
                  value={formData.hero.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Phone Number</label>
                <input
                  type="text"
                  value={formData.hero.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Resume / CV Document URL</label>
                <input
                  type="text"
                  value={formData.hero.resumeUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, resumeUrl: e.target.value },
                    })
                  }
                  placeholder="#contact or PDF link"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub Profile URL</label>
                <input
                  type="url"
                  value={formData.hero.githubUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, githubUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">LinkedIn Profile URL</label>
                <input
                  type="url"
                  value={formData.hero.linkedinUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, linkedinUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Personal Website URL</label>
                <input
                  type="url"
                  value={formData.hero.websiteUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      hero: { ...formData.hero, websiteUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ABOUT & PILLARS */}
        {activeTab === 'about' && (
          <div className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">About Me Settings</h2>
              <p className="text-xs text-slate-400">Update the career bio, paragraphs, spoken languages, and architectural pillars.</p>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Core Summary</label>
              <textarea
                rows={3}
                value={formData.about.summary}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    about: { ...formData.about, summary: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
              />
            </div>

            {/* Paragraphs list */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono text-slate-300">Detailed Bio Paragraphs</label>
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      about: {
                        ...formData.about,
                        bioParagraphs: [
                          ...formData.about.bioParagraphs,
                          'New paragraph detailing your experience or background.',
                        ],
                      },
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Paragraph
                </button>
              </div>

              {formData.about.bioParagraphs.map((p, pIdx) => (
                <div key={pIdx} className="flex gap-2">
                  <textarea
                    rows={3}
                    value={p}
                    onChange={(e) => {
                      const updated = [...formData.about.bioParagraphs];
                      updated[pIdx] = e.target.value;
                      setFormData({
                        ...formData,
                        about: { ...formData.about, bioParagraphs: updated },
                      });
                    }}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updated = formData.about.bioParagraphs.filter((_, i) => i !== pIdx);
                      setFormData({
                        ...formData,
                        about: { ...formData.about, bioParagraphs: updated },
                      });
                    }}
                    className="p-2.5 rounded-xl bg-slate-950 text-slate-400 hover:text-red-400 hover:bg-red-950/30 border border-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Spoken Languages */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">
                Languages Spoken (comma separated)
              </label>
              <input
                type="text"
                value={formData.about.languages.join(', ')}
                onChange={(e) => {
                  const langs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                  setFormData({
                    ...formData,
                    about: { ...formData.about, languages: langs },
                  });
                }}
                placeholder="English, Malayalam, Hindi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>
        )}

        {/* TAB 3: EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Experience Positions</h2>
                <p className="text-xs text-slate-400">Add or modify professional roles, accomplishments, and tech stacks.</p>
              </div>
              <button
                id="admin-add-exp-btn"
                type="button"
                onClick={handleAddExperience}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
              >
                <Plus className="w-4 h-4" /> Add Experience
              </button>
            </div>

            <div className="space-y-6">
              {formData.experience.map((exp, idx) => (
                <div
                  key={exp.id || idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-teal-400 font-semibold">Position #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteExperience(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) => handleUpdateExperience(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdateExperience(idx, 'company', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Period (e.g. Dec 2024 - Present)</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => handleUpdateExperience(idx, 'period', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdateExperience(idx, 'location', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Responsibilities / Achievements (One per line)
                    </label>
                    <textarea
                      rows={3}
                      value={exp.responsibilities.join('\n')}
                      onChange={(e) => {
                        const bullets = e.target.value.split('\n').filter(Boolean);
                        handleUpdateExperience(idx, 'responsibilities', bullets);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  {/* Tech stack */}
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Technologies Used (comma separated)
                    </label>
                    <input
                      type="text"
                      value={exp.technologies?.join(', ') || ''}
                      onChange={(e) => {
                        const techs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        handleUpdateExperience(idx, 'technologies', techs);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: EDUCATION */}
        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Education Details</h2>
                <p className="text-xs text-slate-400">Manage academic degrees, institutions, and achievements.</p>
              </div>
              <button
                id="admin-add-edu-btn"
                type="button"
                onClick={handleAddEducation}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
              >
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>

            <div className="space-y-6">
              {formData.education.map((edu, idx) => (
                <div
                  key={edu.id || idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-teal-400 font-semibold">Degree #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleDeleteEducation(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Degree Title</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleUpdateEducation(idx, 'degree', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleUpdateEducation(idx, 'institution', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Period (e.g. Sep 2021 - Nov 2024)</label>
                      <input
                        type="text"
                        value={edu.period}
                        onChange={(e) => handleUpdateEducation(idx, 'period', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleUpdateEducation(idx, 'location', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Curriculum Highlights / Honors (One per line)
                    </label>
                    <textarea
                      rows={2}
                      value={edu.details.join('\n')}
                      onChange={(e) => {
                        const bullets = e.target.value.split('\n').filter(Boolean);
                        handleUpdateEducation(idx, 'details', bullets);
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Portfolio Projects</h2>
                <p className="text-xs text-slate-400">Add, edit, or remove featured projects, tech tags, and live URLs.</p>
              </div>
              <button
                id="admin-add-project-btn"
                type="button"
                onClick={handleAddProject}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
              >
                <Plus className="w-4 h-4" /> Add Project
              </button>
            </div>

            <div className="space-y-6">
              {formData.projects.map((proj, idx) => (
                <div
                  key={proj.id || idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-teal-400 font-semibold">Project #{idx + 1}</span>
                      <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={proj.featured}
                          onChange={(e) => handleUpdateProject(idx, 'featured', e.target.checked)}
                          className="rounded border-slate-700 bg-slate-950 text-teal-500 focus:ring-0"
                        />
                        <span>Featured Flag</span>
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Project Name</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Category</label>
                      <select
                        value={proj.category}
                        onChange={(e) => handleUpdateProject(idx, 'category', e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      >
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Full-Stack & Web">Full-Stack & Web</option>
                        <option value="Mobile & Systems">Mobile & Systems</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-300 mb-1">Subtitle / Quick Tagline</label>
                      <input
                        type="text"
                        value={proj.subtitle || ''}
                        onChange={(e) => handleUpdateProject(idx, 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-300 mb-1">Full Description</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(idx, 'description', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Technologies / Tech Stack (comma separated)
                      </label>
                      <input
                        type="text"
                        value={proj.technologies.join(', ')}
                        onChange={(e) => {
                          const techs = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                          handleUpdateProject(idx, 'technologies', techs);
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">GitHub / Code Repository URL</label>
                      <input
                        type="url"
                        value={proj.githubUrl || ''}
                        onChange={(e) => handleUpdateProject(idx, 'githubUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Live Demo / App URL</label>
                      <input
                        type="url"
                        value={proj.liveUrl || ''}
                        onChange={(e) => handleUpdateProject(idx, 'liveUrl', e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: CERTIFICATIONS */}
        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Certifications & Credentials</h2>
                <p className="text-xs text-slate-400">
                  Update thumbnail image URLs and certificate links. Clicking each card on the portfolio directs straight to the certificate URL.
                </p>
              </div>
              <button
                id="admin-add-cert-btn"
                type="button"
                onClick={handleAddCertification}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20"
              >
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            <div className="space-y-6">
              {formData.certifications.map((cert, idx) => (
                <div
                  key={cert.id || idx}
                  className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-teal-400 font-semibold">
                      Certification #{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteCertification(idx)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-5">
                    {/* Thumbnail preview column */}
                    <div className="sm:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <div className="w-full aspect-[16/10] rounded-lg overflow-hidden bg-slate-900 mb-2 relative">
                        {cert.thumbnailUrl ? (
                          <img
                            src={cert.thumbnailUrl}
                            alt={cert.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.currentTarget as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs font-mono">
                            No Thumbnail
                          </div>
                        )}
                        <div className="absolute top-2 right-2 p-1 rounded bg-black/60 text-teal-300">
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono text-center">
                        Card Preview (Live Link Test)
                      </div>
                    </div>

                    {/* Inputs column */}
                    <div className="sm:col-span-8 space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Certification Title</label>
                        <input
                          type="text"
                          value={cert.title}
                          onChange={(e) => handleUpdateCertification(idx, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Issuer / Organization</label>
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => handleUpdateCertification(idx, 'issuer', e.target.value)}
                            placeholder="e.g. AWS, CISCO, J.P. Morgan"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">Issue Date / Badge Text</label>
                          <input
                            type="text"
                            value={cert.issueDate || ''}
                            onChange={(e) => handleUpdateCertification(idx, 'issueDate', e.target.value)}
                            placeholder="Verified Credential"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">Small Description</label>
                        <textarea
                          rows={2}
                          value={cert.description}
                          onChange={(e) => handleUpdateCertification(idx, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                        />
                      </div>

                      {/* Direct File Uploader Box */}
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                          <label className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer shadow-md shadow-blue-600/20 transition-all">
                            <Upload className="w-4 h-4" />
                            <span>Upload Certificate Image / File</span>
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                try {
                                  const dataUrl = await readFileAsDataUrl(file);
                                  const updatedCerts = [...formData.certifications];
                                  updatedCerts[idx] = {
                                    ...updatedCerts[idx],
                                    thumbnailUrl: dataUrl,
                                    certificateUrl: dataUrl,
                                  };
                                  setFormData({ ...formData, certifications: updatedCerts });
                                } catch (err) {
                                  console.error('Failed to read certificate file:', err);
                                }
                              }}
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              const updatedCerts = [...formData.certifications];
                              const srcUrl = updatedCerts[idx].thumbnailUrl || updatedCerts[idx].certificateUrl;
                              if (srcUrl) {
                                updatedCerts[idx] = {
                                  ...updatedCerts[idx],
                                  thumbnailUrl: srcUrl,
                                  certificateUrl: srcUrl,
                                };
                                setFormData({ ...formData, certifications: updatedCerts });
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors"
                          >
                            <Link2 className="w-3.5 h-3.5 text-blue-400" />
                            <span>Sync Thumbnail & Target URL</span>
                          </button>
                        </div>
                        <p className="text-[11px] text-slate-400 font-mono">
                          Picks image from your laptop/phone and automatically sets both the card thumbnail and full view link.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Thumbnail Image URL
                          </label>
                          <input
                            type="text"
                            value={cert.thumbnailUrl}
                            onChange={(e) => handleUpdateCertification(idx, 'thumbnailUrl', e.target.value)}
                            placeholder="/certificates/cert.png or URL"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-slate-300 mb-1">
                            Certificate Target URL (Opens on Click)
                          </label>
                          <input
                            type="text"
                            value={cert.certificateUrl}
                            onChange={(e) => handleUpdateCertification(idx, 'certificateUrl', e.target.value)}
                            placeholder="/certificates/cert.png or URL"
                            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SKILLS & STACK */}
        {activeTab === 'skills' && (
          <div className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Skills Categories</h2>
              <p className="text-xs text-slate-400">Group skills by discipline (e.g. Technical & Engineering, Professional & Soft Skills).</p>
            </div>

            <div className="space-y-6">
              {formData.skillCategories.map((group, gIdx) => (
                <div key={gIdx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={group.category}
                      onChange={(e) => {
                        const updated = [...formData.skillCategories];
                        updated[gIdx] = { ...updated[gIdx], category: e.target.value };
                        setFormData({ ...formData, skillCategories: updated });
                      }}
                      className="font-bold text-sm text-teal-400 bg-transparent border-b border-slate-700 focus:outline-none focus:border-teal-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">
                      Skills (comma separated)
                    </label>
                    <textarea
                      rows={3}
                      value={group.skills.join(', ')}
                      onChange={(e) => {
                        const skills = e.target.value.split(',').map((s) => s.trim()).filter(Boolean);
                        const updated = [...formData.skillCategories];
                        updated[gIdx] = { ...updated[gIdx], skills };
                        setFormData({ ...formData, skillCategories: updated });
                      }}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: CONTACT & EMAIL ROUTING */}
        {activeTab === 'contact' && (
          <div className="space-y-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Contact Section & Email Routing</h2>
              <p className="text-xs text-slate-400">
                Configure the destination email where all visitor inquiries are directed, as well as phone and social profile connections.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-teal-400 mb-1.5 font-semibold">
                  Destination Email for Inquiries *
                </label>
                <input
                  type="email"
                  required
                  value={formData.contact.recipientEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, recipientEmail: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-teal-500/40 text-teal-300 font-mono text-sm focus:outline-none focus:border-teal-400"
                />
                <p className="mt-1 text-[11px] text-slate-400">
                  When visitors submit the portfolio contact form, their inquiry is dispatched directly to this email address.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Inquiry Subject Prefix</label>
                <input
                  type="text"
                  value={formData.contact.inquirySubjectPrefix}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, inquirySubjectPrefix: e.target.value },
                    })
                  }
                  placeholder="[Portfolio Inquiry from Akshay.dev]"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Phone / WhatsApp</label>
                <input
                  type="text"
                  value={formData.contact.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Location</label>
                <input
                  type="text"
                  value={formData.contact.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, location: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Availability Note</label>
                <input
                  type="text"
                  value={formData.contact.availabilityNote}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, availabilityNote: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">LinkedIn Profile</label>
                <input
                  type="url"
                  value={formData.contact.linkedinUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, linkedinUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">GitHub Profile</label>
                <input
                  type="url"
                  value={formData.contact.githubUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, githubUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">Personal Website</label>
                <input
                  type="url"
                  value={formData.contact.websiteUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, websiteUrl: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-sm focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Actions Bar */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              id="admin-reset-to-default-btn"
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Original Resume Defaults</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-md shadow-teal-500/20 transition-all active:scale-[0.98]"
            >
              <Save className="w-4 h-4" />
              <span>Save All Changes</span>
            </button>
          </div>
        </div>

        {/* Confirmation Modal for Reset */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3 text-amber-400">
                <AlertTriangle className="w-6 h-6" />
                <h3 className="text-lg font-bold text-white">Reset to Resume Defaults?</h3>
              </div>
              <p className="text-sm text-slate-300">
                This will reset all portfolio sections back to the original details extracted from Akshay Linson M's resume. Any unsaved custom modifications will be cleared.
              </p>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onReset();
                    setShowResetConfirm(false);
                    alert('Portfolio restored to original resume defaults!');
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
