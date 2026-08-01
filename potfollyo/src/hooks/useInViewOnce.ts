import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export function useInViewOnce(options?: { threshold?: number; rootMargin?: string }) {
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: options?.threshold ?? 0.2,
    rootMargin: options?.rootMargin ?? '0px',
  });
  return { ref, inView, entry };
}

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
