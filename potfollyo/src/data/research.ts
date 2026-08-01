export const researchQuestions = [
  'Can machine-learning models accurately predict Remaining Useful Life (RUL) of turbofan engines from multivariate sensor data?',
  'Which feature-engineering strategy yields the strongest regression performance for time-series degradation data?',
  'How do ensemble tree methods compare with deep neural networks when training data is limited?',
];

export const objectives = [
  'Preprocess the NASA C-MAPSS FD001 dataset into a clean, normalised, and analysis-ready form.',
  'Engineer 200+ time-series features capturing rolling statistics, lag, delta, and cumulative behaviour.',
  'Train and benchmark three regression models — Random Forest, XGBoost, MLP — against MAE, RMSE and R².',
  'Translate predictions into actionable maintenance recommendations using a four-tier RUL decision matrix.',
];

export const chapters = [
  { id: 'ch1', title: 'Introduction', pages: '1–14' },
  { id: 'ch2', title: 'Literature Review', pages: '15–38' },
  { id: 'ch3', title: 'Methodology', pages: '39–62' },
  { id: 'ch4', title: 'Implementation', pages: '63–88' },
  { id: 'ch5', title: 'Results & Discussion', pages: '89–118' },
  { id: 'ch6', title: 'Maintenance Recommendation Framework', pages: '119–132' },
  { id: 'ch7', title: 'Conclusion & Future Work', pages: '133–146' },
];

export const references = [
  {
    id: 'r1',
    authors: 'A. Saxena and K. Goebel',
    year: 2008,
    title: 'Turbofan Engine Degradation Simulation Data Set',
    venue: 'NASA Ames Prognostics Data Repository',
    type: 'dataset',
  },
  {
    id: 'r2',
    authors: 'A. Saxena, K. Goebel, D. Simon, and N. Eklund',
    year: 2008,
    title: 'Damage propagation modeling for aircraft engine run-to-failure simulation',
    venue: 'International Conference on Prognostics and Health Management',
    type: 'conference',
  },
  {
    id: 'r3',
    authors: 'T. S. Babu, P. Saini, and S. Saravanan',
    year: 2016,
    title: 'Prediction of remaining useful life of turbofan engine using machine learning classifiers',
    venue: 'Procedia Computer Science',
    type: 'journal',
  },
  {
    id: 'r4',
    authors: 'L. Breiman',
    year: 2001,
    title: 'Random Forests',
    venue: 'Machine Learning, 45(1)',
    type: 'journal',
  },
  {
    id: 'r5',
    authors: 'T. Chen and C. Guestrin',
    year: 2016,
    title: 'XGBoost: A Scalable Tree Boosting System',
    venue: 'ACM SIGKDD International Conference on Knowledge Discovery and Data Mining',
    type: 'conference',
  },
  {
    id: 'r6',
    authors: 'Y. LeCun, Y. Bengio, and G. Hinton',
    year: 2015,
    title: 'Deep Learning',
    venue: 'Nature, 521(7553)',
    type: 'journal',
  },
  {
    id: 'r7',
    authors: 'E. Ramasso and A. Saxena',
    year: 2014,
    title: 'Performance benchmarking and analysis of prognostic methods on a NASA benchmark data set',
    venue: 'Mechanical Systems and Signal Processing',
    type: 'journal',
  },
];

export function formatIEEE(ref: (typeof references)[number]): string {
  const initials = ref.authors
    .split(/, | and /)
    .map((name) => {
      const parts = name.trim().split(' ');
      const first = parts[0];
      const last = parts[parts.length - 1];
      return `${first[0]}. ${last}`;
    })
    .join(', ');
  return `${initials}, "${ref.title}," ${ref.venue}, ${ref.year}.`;
}
