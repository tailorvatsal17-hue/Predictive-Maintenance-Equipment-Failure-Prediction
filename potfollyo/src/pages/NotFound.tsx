import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="section flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="text-7xl font-display font-bold gradient-text">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 max-w-md text-slate-600 dark:text-slate-400">
        The page you were looking for has either moved or never existed. Use the navigation above
        or jump back to the home page.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" /> Home
        </Link>
        <button type="button" onClick={() => window.history.back()} className="btn-ghost">
          <ArrowLeft className="h-4 w-4" /> Go back
        </button>
      </div>
    </div>
  );
}
