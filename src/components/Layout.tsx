import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { founders, ventures, SITE } from '../data/site';
import { pageMeta } from '../seo';
import { Ext } from './ui';

const nav = [
  { to: '/founders/usman-shehu', label: 'Usman Shehu' },
  { to: '/founders/yahayah-adam', label: 'Yahayah Adam' },
  { to: '/our-partnership', label: 'Partnership' },
  { to: '/ventures', label: 'Ventures' },
  { to: '/projects', label: 'Projects' },
  { to: '/journey', label: 'Journey' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
    const m = pageMeta(pathname);
    document.title = m.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', m.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', m.canonical);
  }, [pathname]);

  const link = ({ isActive }: { isActive: boolean }) =>
    `rounded px-3 py-2 text-sm transition-colors ${isActive ? 'text-goldlt' : 'text-slate-300 hover:text-white'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
        <div className="wrap flex h-16 items-center justify-between">
          <Link to="/" className="font-serif text-lg font-semibold text-white">Shehu <span className="text-gold">&amp;</span> Adam</Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => <NavLink key={n.to} to={n.to} className={link}>{n.label}</NavLink>)}
          </nav>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded border border-line lg:hidden" aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              {open ? <path d="M4 4l12 12M16 4L4 16" /> : <path d="M3 6h14M3 10h14M3 14h14" />}
            </svg>
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="wrap flex flex-col border-t border-line pb-4 lg:hidden">
            {nav.map((n) => <NavLink key={n.to} to={n.to} className={(s) => link(s) + ' py-3 text-base'}>{n.label}</NavLink>)}
          </nav>
        )}
      </header>
      <main id="main"><Outlet /></main>
      <footer className="border-t border-line bg-navy/50">
        <div className="wrap grid gap-10 py-12 sm:grid-cols-3">
          <div>
            <p className="font-serif text-xl text-white">Usman Shehu &amp; Yahayah Adam</p>
            <p className="mt-3 max-w-xs text-sm">Founders and business partners building digital products, technology ventures, and businesses.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Founders</p>
            <ul className="mt-3 space-y-2 text-sm">
              {founders.map((f) => <li key={f.id}><Link className="hover:text-goldlt" to={`/founders/${f.slug}`}>{f.name}{f.alternateName ? ` (${f.alternateName})` : ''}</Link></li>)}
              <li><Link className="hover:text-goldlt" to="/our-partnership">Our partnership</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Ventures</p>
            <ul className="mt-3 space-y-2 text-sm">
              {ventures.map((v) => <li key={v.id}>{v.website ? <Ext className="hover:text-goldlt" href={v.website}>{v.name}</Ext> : v.name}</li>)}
              <li><Link className="hover:text-goldlt" to="/projects">All projects</Link></li>
            </ul>
          </div>
        </div>
        <p className="border-t border-line py-5 text-center text-xs text-slate-500">&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
      </footer>
    </>
  );
}
