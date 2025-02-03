"use client";

import { useEffect, useRef } from "react";

export default function Counter({
  initialValue = 0,
  value = 100,
  duration = 2000,
  delay = 0,
}) {
  const counterRef = useRef(null);

  // Define the counter animation function
  const animateCounter = (start, end, duration) => {
    let startTime = null;

    const updateCounter = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const newValue = Math.floor(progress * (end - start) + start);
      if (counterRef.current) {
        counterRef.current.innerText = newValue;
      }
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    // Create the Intersection Observer inside useEffect so that it
    // only exists while the component is mounted.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {

          if (entry.isIntersecting) {
            // Start the animation after the optional delay
            setTimeout(() => {
              animateCounter(+initialValue, value, duration);
            }, delay);
            // Disconnect the observer once the element is visible and animation started
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    // Cleanup: disconnect the observer if the component unmounts
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <span ref={counterRef} className="purecounter">
      {initialValue}
    </span>
  );
}
