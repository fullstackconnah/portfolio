import { useEffect, useRef, useState } from 'react';


export function useScrollAnimation(options = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px'
  } = options;

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, triggerOnce, rootMargin]);

  return [ref, inView];
}


export function useStaggerAnimation(itemCount, options = {}) {
  const {
    delayIncrement = 100,
    threshold = 0.1
  } = options;

  const [ref, inView] = useScrollAnimation({ threshold });

  const getDelay = (index) => {
    return inView ? index * delayIncrement : 0;
  };

  return [ref, inView, getDelay];
}
