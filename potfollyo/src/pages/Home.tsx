import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Database, Brain, Activity, Cog, Sparkles, Wrench, Download, GraduationCap, Github, Linkedin, Mail, FileText } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Card from '@/components/ui/Card';
import StatCounter from '@/components/ui/StatCounter';
import Badge from '@/components/ui/Badge';
import { pipelineSteps, projectMetrics, techStack, modelResults } from '@/data/project';
import { profile } from '@/data/profile';

const iconMap: Record<string, typeof Database> = { database: Database, sparkles: Sparkles, cog: Cog, filter: Sparkles, brain: Brain, activity: Activity };

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-grid opacity-60" aria-hidden />
        <div className="absolute -top-32 -left-20 -z-10 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
        <div className="absolute -top-12 right-0 -z-10 h-96 w-96 rounded-full bg-accent-400/20 blur-3xl" aria-hidden />
        <div className="section pt-24 sm:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <Badge tone="brand" className="mb-6">
              <GraduationCap className="h-3.5 w-3.5" /> MSc Dissertation · {profile.year}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.05]">
              Predictive Maintenance &
              <br />
              <span className="gradient-text">Equipment Failure Prediction</span>
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-2xl">
              An end-to-end machine-learning study on the NASA C-MAPSS turbofan engine dataset.
              100 engines · 20,631 cycles · 212 engineered features · 3 models benchmarked —
              to forecast Remaining Useful Life and translate predictions into maintenance decisions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/about" className="btn-primary">
                Explore the Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/prediction" className="btn-ghost">
                <Activity className="h-4 w-4" /> Try RUL Prediction
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              <StatCounter value={projectMetrics.totalSamples} label="Training samples" />
              <StatCounter value={projectMetrics.finalFeatures} label="Engineered features" />
              <StatCounter value={projectMetrics.modelsTrained} label="ML models trained" />
              <StatCounter value={projectMetrics.bestR2} decimals={2} suffix=" R²" label="Best model accuracy" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section className="section">
        <SectionHeading
          eyebrow="Workflow"
          title="From raw telemetry to maintenance decision"
          subtitle="Six pipeline phases — every script reproducible, every artefact auditable."
        />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pipelineSteps.map((step, idx) => {
            const Icon = iconMap[step.icon] ?? Cog;
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
              >
                <Card hover className="relative h-full">
                  <div className="flex items-start gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl gradient-bg text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">Phase {step.id}</span>
                      <h3 className="mt-1 font-semibold text-lg">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Quick links */}
      <section className="section">
        <SectionHeading eyebrow="Dive in" title="Quick navigation" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { to: '/dataset', title: 'NASA C-MAPSS Dataset', desc: 'Explore the 100-engine dataset and its sensor signatures.', icon: Database },
            { to: '/feature-engineering', title: 'Feature Engineering', desc: 'Rolling, lag, delta, cumulative — 21 → 212 features.', icon: Cog },
            { to: '/evaluation', title: 'Performance Evaluation', desc: 'MAE, RMSE, R² across Random Forest, XGBoost, Neural Network.', icon: Activity },
            { to: '/prediction', title: 'RUL Prediction Dashboard', desc: 'Compare per-engine forecasts from each trained model.', icon: Brain },
            { to: '/maintenance', title: 'Maintenance Recommendation', desc: 'Four-tier decision matrix from predicted Remaining Useful Life.', icon: Wrench },
            { to: '/research', title: 'Research & Dissertation', desc: 'Read the chapters, methodology, and download the PDF.', icon: FileText },
          ].map((card, idx) => (
            <motion.div
              key={card.to}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.04 }}
            >
              <Link to={card.to}>
                <Card hover className="h-full">
                  <card.icon className="h-6 w-6 text-brand-500" />
                  <h3 className="mt-4 font-semibold text-lg">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{card.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400">
                    Open <ArrowRight className="h-4 w-4" />
                  </span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Model leaderboard */}
      <section className="section">
        <SectionHeading
          eyebrow="Headline result"
          title="The Neural Network leads on every metric"
          subtitle="Best performance among the three trained regressors. Hover to compare."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {modelResults.map((m, idx) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <Card hover className="h-full relative overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: `linear-gradient(90deg, ${m.color}, ${m.color}80)` }}
                  aria-hidden
                />
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{m.description}</p>
                <dl className="mt-5 grid grid-cols-3 gap-3 text-center">
                  <div>
                    <dt className="text-xs text-slate-500">MAE</dt>
                    <dd className="text-xl font-semibold">{m.mae}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">RMSE</dt>
                    <dd className="text-xl font-semibold">{m.rmse}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">R²</dt>
                    <dd className="text-xl font-semibold">{m.r2}</dd>
                  </div>
                </dl>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="section">
        <SectionHeading eyebrow="Toolchain" title="Built with" />
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <Badge key={tech} tone="neutral" className="text-sm px-4 py-1.5">{tech}</Badge>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="glass-card relative overflow-hidden p-8 sm:p-12">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight">
              Read the dissertation, run the code, or get in touch.
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 max-w-xl">
              {profile.name} · {profile.course}, {profile.university}.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/research" className="btn-primary">
                Research overview <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                <Mail className="h-4 w-4" /> Contact
              </Link>
            </div>
            <div className="mt-6 flex gap-3 text-sm text-slate-500 dark:text-slate-400">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand-500">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <span aria-hidden>·</span>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-brand-500">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
