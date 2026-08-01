import { BookOpen, FileText, Layers, Workflow, Download, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import { useDocumentTitle } from '@/hooks/useInViewOnce';
import { researchQuestions, objectives, chapters, references, formatIEEE } from '@/data/research';
import { profile } from '@/data/profile';

export default function Research() {
  useDocumentTitle('Research — ' + profile.shortName);
  return (
    <div className="section">
      {/* Download CTA — sits at the top so it's the first thing the user sees */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12"
      >
        <div className="glass-card relative overflow-hidden p-8 sm:p-10">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
          <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand-600 dark:text-brand-400">
                <GraduationCap className="h-3.5 w-3.5" /> Full dissertation
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold font-display tracking-tight">
                Download the complete dissertation report
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
                146-page PDF covering all seven chapters — introduction, literature review,
                methodology, implementation, results, maintenance framework, and conclusion —
                plus the full reference list in IEEE format.
              </p>
            </div>
            <a
              href="/dissertation.pdf"
              download="Vatsal_Tailor_MSc_Dissertation.pdf"
              className="btn-primary self-start md:self-center text-base px-6 py-3 whitespace-nowrap"
              aria-label="Download dissertation PDF"
            >
              <Download className="h-5 w-5" /> Download PDF
            </a>
          </div>
        </div>
      </motion.div>

      <SectionHeading
        eyebrow="Methodology"
        title="Research questions, objectives, and structure"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <Card>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-brand-500" /> Research Questions
          </h3>
          <ol className="mt-4 space-y-3 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300">
            {researchQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
        </Card>
        <Card>
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-500" /> Objectives
          </h3>
          <ol className="mt-4 space-y-3 list-decimal pl-5 text-sm text-slate-700 dark:text-slate-300">
            {objectives.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ol>
        </Card>
      </div>

      <SectionHeading eyebrow="Workflow" title="Architecture" />
      <Card className="mb-12">
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {['Raw .txt files', 'Preprocessing', 'Feature Engineering', 'Model Training', 'RUL Prediction', 'Maintenance'].map((stage, i) => (
            <div key={stage} className="flex items-center gap-3">
              <span className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 font-medium">
                <Workflow className="inline h-4 w-4 mr-1.5 text-brand-500" /> {stage}
              </span>
              {i < 5 && <span className="text-2xl text-slate-300 dark:text-slate-600">→</span>}
            </div>
          ))}
        </div>
      </Card>

      <SectionHeading eyebrow="Structure" title="Dissertation chapters" />
      <Card className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-widest text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <th className="py-3 pr-4 w-16">Chapter</th>
              <th className="py-3 pr-4">Title</th>
              <th className="py-3">Pages</th>
            </tr>
          </thead>
          <tbody>
            {chapters.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 dark:border-slate-800/60">
                <td className="py-3 pr-4 font-mono">{c.id.toUpperCase()}</td>
                <td className="py-3 pr-4 font-medium flex items-center gap-2">
                  <Layers className="h-4 w-4 text-brand-500" /> {c.title}
                </td>
                <td className="py-3 text-slate-500 font-mono">{c.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <SectionHeading eyebrow="Bibliography" title="Selected references (IEEE)" className="mt-12" />
      <Card>
        <ol className="space-y-3 text-sm text-slate-700 dark:text-slate-300 list-decimal pl-5">
          {references.map((r) => (
            <li key={r.id}>{formatIEEE(r)}</li>
          ))}
        </ol>
      </Card>

      {/* Bottom CTA so the download is reachable after reading the full page */}
      <div className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md">
        <div>
          <p className="font-semibold">Ready to read the full report?</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            146-page PDF · 6.6 MB · generated for offline reading.
          </p>
        </div>
        <a
          href="/dissertation.pdf"
          download="Vatsal_Tailor_MSc_Dissertation.pdf"
          className="btn-primary whitespace-nowrap"
          aria-label="Download dissertation PDF"
        >
          <Download className="h-4 w-4" /> Download dissertation
        </a>
      </div>
    </div>
  );
}
