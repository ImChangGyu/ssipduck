import { useEffect, useMemo, useRef, useState } from 'react';

export default function useInfiniteScroll(
  fetchFunction: (page: number) => void
) {
  const [pageNumber, setPageNumber] = useState(1);
  const ref = useRef<HTMLDivElement>(null);

  const callback = (entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setPageNumber((prev) => prev + 1);
    }
  };

  const options: IntersectionObserverInit = useMemo(
    () => ({
      root: null,
      threshold: 0,
    }),
    []
  );

  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(container);
    return () => observer.disconnect();
  }, [options, ref.current]);

  useEffect(() => {
    if (pageNumber === 1) return;
    fetchFunction(pageNumber);
  }, [pageNumber]);

  console.log(ref.current);
  console.log(pageNumber);

  return { ref };
}
