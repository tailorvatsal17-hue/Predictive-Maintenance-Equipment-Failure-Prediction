export interface NavLink {
  to: string;
  label: string;
}

export const navLinks: NavLink[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/dataset', label: 'Dataset' },
  { to: '/preprocessing', label: 'Preprocessing' },
  { to: '/feature-engineering', label: 'Features' },
  { to: '/model-training', label: 'Training' },
  { to: '/prediction', label: 'Prediction' },
  { to: '/evaluation', label: 'Evaluation' },
  { to: '/feature-importance', label: 'Importance' },
  { to: '/maintenance', label: 'Maintenance' },
  { to: '/research', label: 'Research' },
  { to: '/contact', label: 'Contact' },
];
