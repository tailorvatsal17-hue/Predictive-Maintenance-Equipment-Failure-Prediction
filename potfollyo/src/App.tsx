import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Home from '@/pages/Home';

const About = lazy(() => import('@/pages/About'));
const Dataset = lazy(() => import('@/pages/Dataset'));
const Preprocessing = lazy(() => import('@/pages/Preprocessing'));
const FeatureEngineering = lazy(() => import('@/pages/FeatureEngineering'));
const ModelTraining = lazy(() => import('@/pages/ModelTraining'));
const Prediction = lazy(() => import('@/pages/Prediction'));
const Evaluation = lazy(() => import('@/pages/Evaluation'));
const FeatureImportance = lazy(() => import('@/pages/FeatureImportance'));
const Maintenance = lazy(() => import('@/pages/Maintenance'));
const Research = lazy(() => import('@/pages/Research'));
const Contact = lazy(() => import('@/pages/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <ScrollProgress />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/dataset" element={<PageWrapper><Dataset /></PageWrapper>} />
              <Route path="/preprocessing" element={<PageWrapper><Preprocessing /></PageWrapper>} />
              <Route path="/feature-engineering" element={<PageWrapper><FeatureEngineering /></PageWrapper>} />
              <Route path="/model-training" element={<PageWrapper><ModelTraining /></PageWrapper>} />
              <Route path="/prediction" element={<PageWrapper><Prediction /></PageWrapper>} />
              <Route path="/evaluation" element={<PageWrapper><Evaluation /></PageWrapper>} />
              <Route path="/feature-importance" element={<PageWrapper><FeatureImportance /></PageWrapper>} />
              <Route path="/maintenance" element={<PageWrapper><Maintenance /></PageWrapper>} />
              <Route path="/research" element={<PageWrapper><Research /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

function PageLoader() {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-300 border-t-brand-500" />
    </div>
  );
}
