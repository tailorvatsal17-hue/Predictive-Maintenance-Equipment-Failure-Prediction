import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Cpu, Heart } from 'lucide-react';
import { profile } from '@/data/profile';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-950/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl gradient-bg text-white shadow-soft">
                <Cpu className="h-5 w-5" />
              </span>
              <span className="font-display font-bold text-lg">
                Vatsal
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400 max-w-md">
              {profile.dissertationTitle}
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
              {profile.university} · {profile.course}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-slate-900 dark:text-slate-100">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600">About Project</Link></li>
              <li><Link to="/dataset" className="text-slate-600 dark:text-slate-400 hover:text-brand-600">Dataset</Link></li>
              <li><Link to="/model-training" className="text-slate-600 dark:text-slate-400 hover:text-brand-600">Models</Link></li>
              <li><Link to="/research" className="text-slate-600 dark:text-slate-400 hover:text-brand-600">Research</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3 text-slate-900 dark:text-slate-100">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600">
                  <Mail className="h-4 w-4" /> {profile.email}
                </a>
              </li>
              {profile.linkedin && (
                <li>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </li>
              )}
              {profile.github && (
                <li>
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-slate-500 dark:text-slate-500">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <p className="inline-flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-rose-500" /> using React, Vite, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
