import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Founder, Venture } from '../data/site';

export const Ext = (p: AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a target="_blank" rel="noopener noreferrer" {...p} />
);

export function Photo({ f, className = '', priority = false }: { f: Founder; className?: string; priority?: boolean }) {
  if (!f.photoReady) {
    return (
      <div role="img" aria-label={f.photoAlt} className={`flex items-center justify-center bg-navy2 font-serif text-6xl text-gold ${className}`}>
        {f.initials}
      </div>
    );
  }
  return (
    <picture>
      <source type="image/webp" sizes="(min-width:1024px) 420px, 80vw" srcSet={`${f.photo}-480.webp 480w, ${f.photo}-800.webp 800w, ${f.photo}-1200.webp 1200w`} />
      <img src={`${f.photo}.jpg`} alt={f.photoAlt} width={800} height={1000} loading={priority ? 'eager' : 'lazy'} decoding="async" className={`h-full w-full object-cover ${className}`} />
    </picture>
  );
}

export function Logo({ v, size = 64, className = '' }: { v: Venture; size?: number; className?: string }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${v.logo}.webp`} />
      <img src={`${v.logo}.png`} alt={v.logoAlt} width={size} height={size} loading="lazy" decoding="async" className={`rounded-xl ${className}`} />
    </picture>
  );
}

export const Section = ({ title, intro, children, id }: { title: string; intro?: string; children: ReactNode; id?: string }) => (
  <section id={id} className="section">
    <div className="wrap">
      <h2 className="h2">{title}</h2>
      {intro && <p className="lead mt-4">{intro}</p>}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

export const PageHead = ({ title, intro }: { title: string; intro: string }) => (
  <header className="border-b border-line bg-navy/40 py-14 sm:py-20">
    <div className="wrap">
      <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl">{title}</h1>
      <p className="lead mt-5">{intro}</p>
    </div>
  </header>
);

export function FounderCard({ f }: { f: Founder }) {
  return (
    <article className="card flex flex-col gap-6 sm:flex-row">
      <Link to={`/founders/${f.slug}`} className="block w-40 shrink-0 self-center sm:self-start" aria-label={`${f.name} profile`}>
        <div className="arch aspect-[4/5]"><Photo f={f} className="h-full w-full" /></div>
      </Link>
      <div>
        <h3 className="text-2xl"><Link to={`/founders/${f.slug}`}>{f.name}{f.alternateName ? ` (${f.alternateName})` : ''}</Link></h3>
        <p className="mt-1 text-sm text-goldlt">{f.labels}</p>
        <p className="mt-3 text-sm leading-relaxed">{f.summary}</p>
        <Link to={`/founders/${f.slug}`} className="mt-4 inline-block text-sm font-semibold text-goldlt hover:text-white">Read {f.name.split(' ')[0]}&rsquo;s profile</Link>
      </div>
    </article>
  );
}
