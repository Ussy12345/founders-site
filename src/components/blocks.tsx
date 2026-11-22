import { Link } from 'react-router-dom';
import { SITE, achievements, founderById, founders, projects, timeline, ventures, type Project, type Venture } from '../data/site';
import { Ext, Logo } from './ui';

export function VentureCard({ v }: { v: Venture }) {
  return (
    <article className="card flex flex-col">
      <div className="flex items-center gap-4">
        <Logo v={v} size={72} />
        <div>
          <h3 className="text-2xl">{v.name}</h3>
          <p className="text-sm text-goldlt">{v.category}</p>
        </div>
      </div>
      <p className="mt-5 line-clamp-6 text-sm leading-relaxed">{v.description}</p>
      <dl className="mt-5 space-y-2 text-sm">
        {v.leadership.map((l) => (
          <div key={l.founderId} className="flex gap-2">
            <dt className="w-32 shrink-0 text-slate-400">{l.role}</dt>
            <dd><Link className="text-white hover:text-goldlt" to={`/founders/${founderById(l.founderId).slug}`}>{founderById(l.founderId).name}</Link></dd>
          </div>
        ))}
        {v.offerings.length > 0 && (
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 text-slate-400">Products</dt>
            <dd>{v.offerings.join(', ')}</dd>
          </div>
        )}
      </dl>
      <div className="mt-6 flex flex-wrap gap-3">
        {v.website && <Ext href={v.website} className="btn btn-gold">Visit {v.name}</Ext>}
        {projects.some((p) => p.slug === v.slug) && <Link to={`/projects/${v.slug}`} className="btn btn-ghost">Project details</Link>}
      </div>
    </article>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  const v = ventures.find((x) => x.id === p.ventureId)!;
  return (
    <article className="card flex flex-col">
      {p.image ? (
        <img src={p.image} alt={`${p.name} screenshot`} loading="lazy" decoding="async" className="mb-5 aspect-video w-full rounded-xl object-cover" />
      ) : (
        <div className="mb-5 flex aspect-video w-full items-center justify-center rounded-xl bg-navy2"><Logo v={v} size={96} /></div>
      )}
      <h3 className="text-2xl"><Link to={`/projects/${p.slug}`}>{p.name}</Link></h3>
      <p className="mt-3 line-clamp-6 text-sm leading-relaxed">{v.description}</p>
      {p.status && <p className="mt-3 text-sm text-goldlt">Status: {p.status}</p>}
      {p.technologies.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-xs">{t}</li>)}</ul>
      )}
      <div className="mt-6 flex flex-wrap gap-3">
        {p.website && <Ext href={p.website} className="btn btn-gold">Visit website</Ext>}
        <Link to={`/projects/${p.slug}`} className="btn btn-ghost">Details</Link>
      </div>
    </article>
  );
}

export function Timeline() {
  return (
    <ol className="relative ml-3 space-y-8 border-l border-gold/40 pl-8">
      {timeline.map((m, i) => (
        <li key={m.label} className="relative">
          <span className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-gold" aria-hidden="true" />
          <h3 className="text-xl">{m.label}</h3>
          {m.date && <p className="text-sm text-goldlt">{m.date}</p>}
          <p className="mt-1 text-sm leading-relaxed">{m.description}</p>
          <span className="sr-only">Step {i + 1} of {timeline.length}</span>
        </li>
      ))}
    </ol>
  );
}

export function Achievements() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {achievements.map((a) => (
        <li key={a.title} className="card">
          <h3 className="text-lg">{a.title}</h3>
          <p className="mt-2 text-sm leading-relaxed">{a.detail}</p>
        </li>
      ))}
    </ul>
  );
}

export function ContactBlock() {
  const socials = founders.flatMap((f) => f.socials.map((s) => ({ ...s, who: f.name })));
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="card">
        <h3 className="text-xl">Get in touch</h3>
        {SITE.email ? (
          <p className="mt-3 text-sm">Business email: <a className="text-goldlt hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        ) : (
          <p className="mt-3 text-sm">A business contact email will be published here soon. For now, reach us through our company websites.</p>
        )}
        {socials.length > 0 && (
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => <li key={s.url}><Ext className="text-goldlt hover:text-white" href={s.url}>{s.who}: {s.label}</Ext></li>)}
          </ul>
        )}
      </div>
      <div className="card">
        <h3 className="text-xl">Official company websites</h3>
        <ul className="mt-3 space-y-2 text-sm">
          {ventures.filter((v) => v.website || v.email).map((v) => (
            <li key={v.id}>
              {v.website ? <Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}: {v.website.replace('https://', '')}</Ext> : <span className="text-white">{v.name}</span>}
              {v.email && <>{' '}<a className="text-goldlt hover:text-white" href={`mailto:${v.email}`}>{v.email}</a></>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
