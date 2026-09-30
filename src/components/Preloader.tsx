'use client';

import { useEffect, useState } from 'react';

type Props = {
  images?: string[];
  videos?: string[];
  fonts?: string[];
  minDuration?: number;      // ms mínimos visibles
  maxDuration?: number;      // ms máximos antes de forzar salida
  cacheKey?: string;         // clave para sessionStorage
  children: React.ReactNode;
};

export default function Preloader({
  images = [],
  videos = [],
  fonts = [],
  minDuration = 900,
  maxDuration = 15000,
  cacheKey = 'preloader-done',
  children,
}: Props) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [label, setLabel] = useState('Preparando tu invitación');

  useEffect(() => {
    // Si ya cargó en esta sesión, saltar el preloader
    if (typeof window !== 'undefined' && sessionStorage.getItem(cacheKey) === '1') {
      setProgress(100);
      setDone(true);
      return;
    }

    let cancelado = false;
    const start = Date.now();

    // Deduplicar
    const imgs = Array.from(new Set(images));
    const vids = Array.from(new Set(videos));
    const fnts = Array.from(new Set(fonts));

    const tasks: Promise<void>[] = [];

    // ---- Imágenes ----
    imgs.forEach((src) => {
      tasks.push(
        new Promise<void>((res) => {
          const img = new Image();
          img.onload = () => res();
          img.onerror = () => res();
          img.src = src;
        })
      );
    });

    // ---- Fuentes ----
    fnts.forEach((src) => {
      tasks.push(
        new Promise<void>((res) => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'font';
          link.type = 'font/woff2';
          link.href = src;
          link.crossOrigin = 'anonymous';
          link.onload = () => res();
          link.onerror = () => res();
          document.head.appendChild(link);
        })
      );
    });

    // ---- Videos ----
    vids.forEach((src) => {
      tasks.push(
        fetch(src, { cache: 'force-cache' })
          .then(() => undefined)
          .catch(() => undefined)
      );
    });

    // ---- Etiquetas rotativas para dar sensación de avance ----
    const labels = [
      'Preparando tu invitación',
      'Cargando imágenes',
      'Afinando los últimos detalles',
    ];
    let labelIdx = 0;
    const labelTimer = setInterval(() => {
      labelIdx = (labelIdx + 1) % labels.length;
      if (!cancelado) setLabel(labels[labelIdx]);
    }, 2200);

    // ---- Progreso ----
    const total = tasks.length || 1;
    let completed = 0;

    tasks.forEach((t) => {
      t.then(() => {
        completed++;
        if (!cancelado) {
          setProgress(Math.round((completed / total) * 100));
        }
      });
    });

    // ---- Cierre ----
    Promise.all(tasks).then(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, minDuration - elapsed);
      setTimeout(() => {
        if (cancelado) return;
        sessionStorage.setItem(cacheKey, '1');
        setDone(true);
      }, remaining);
    });

    // ---- Seguridad ----
    const safety = setTimeout(() => {
      if (cancelado) return;
      sessionStorage.setItem(cacheKey, '1');
      setDone(true);
    }, maxDuration);

    return () => {
      cancelado = true;
      clearInterval(labelTimer);
      clearTimeout(safety);
    };
  }, [images, videos, fonts, minDuration, maxDuration, cacheKey]);

  return (
    <>
      {!done && (
        <div className="preloader">
          <div className="preloader__logo">
            <img src="/images/logoGeresa.png" alt="" />
          </div>

          <div className="preloader__spinner" aria-hidden="true" />

          <div className="preloader__label">{label}</div>

          <div className="preloader__bar">
            <div
              className="preloader__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="preloader__pct">{progress}%</div>
        </div>
      )}

      {done && <div className="preloader__content">{children}</div>}
    </>
  );
}