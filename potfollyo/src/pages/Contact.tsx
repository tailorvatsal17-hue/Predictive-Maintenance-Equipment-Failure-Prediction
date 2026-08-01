import { Mail, Linkedin, Github, MapPin, GraduationCap, FileText } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { profile } from '@/data/profile';

export default function Contact() {
  useDocumentTitle('Contact — ' + profile.shortName);
  return (
    <div className="section">
      <SectionHeading
        eyebrow="Get in touch"
        title="Contact"
        subtitle="Open to research collaborations, recruiter conversations, and supervisor feedback."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <div className="grid h-16 w-16 place-items-center rounded-2xl gradient-bg text-white text-2xl font-display font-bold">
            VT
          </div>
          <h2 className="mt-4 font-semibold text-xl">{profile.name}</h2>
          <p className="text-sm text-slate-500">{profile.course}</p>
          <p className="text-sm text-slate-500">{profile.university}</p>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-lg">Channels</h3>
          <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-500" /> Email
              </span>
              <a href={`mailto:${profile.email}`} className="font-mono text-sm hover:text-brand-500">
                {profile.email}
              </a>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <Linkedin className="h-4 w-4 text-brand-500" /> LinkedIn
              </span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-500">
                {profile.linkedin.replace('https://', '')}
              </a>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <Github className="h-4 w-4 text-brand-500" /> GitHub
              </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-brand-500">
                {profile.github.replace('https://', '')}
              </a>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-500" /> Location
              </span>
              <span className="text-sm text-slate-500">London, United Kingdom</span>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <GraduationCap className="h-4 w-4 text-brand-500" /> Status
              </span>
              <span className="text-sm text-slate-500">Open to opportunities</span>
            </li>
            <li className="flex items-center justify-between py-3">
              <span className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-brand-500" /> Dissertation
              </span>
              <span className="text-sm text-slate-500">Submitted {profile.year}</span>
            </li>
          </ul>
        </Card>
      </div>

      <Card className="mt-8">
        <h3 className="font-semibold text-lg">Send a message</h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          The fastest way to reach me is by email — your default mail client will open with my address
          pre-filled when you click the button below.
        </p>
        <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Re: MSc Dissertation Portfolio')}`} className="btn-primary mt-4">
          <Mail className="h-4 w-4" /> Compose email
        </a>
      </Card>
    </div>
  );
}
