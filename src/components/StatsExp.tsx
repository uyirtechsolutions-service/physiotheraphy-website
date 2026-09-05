"use client";

import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

type CounterProps = {
  value: string;
  label: string;
  active: boolean;
};

function Counter({ value, label, active }: CounterProps) {
  const match = value.match(/([\d,]+)(.*)/);
  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const suffix = match?.[2] ?? "";
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(target * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(update);
      }
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [active, target]);

  const formatted = count.toLocaleString("en-IN");

  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-white sm:text-5xl">
        {formatted}
        {suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-brand-300">{label}</p>
    </div>
  );
}

export default function StatsExp() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="mt-10 bg-brand-950 py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <Counter key={stat.label} value={stat.value} label={stat.label} active={active} />
        ))}
      </div>
    </section>
  );
}
