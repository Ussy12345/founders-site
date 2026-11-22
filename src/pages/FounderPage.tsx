import { Link, useParams } from 'react-router-dom';
import { founderById, getFounder, ventures } from '../data/site';
import { Ext, Photo } from '../components/ui';
import { ContactBlock, VentureCard } from '../components/blocks';
import { NotFound } from './Others';

export default function FounderPage() {
  const { slug = '' } = useParams();
  const f = getFounder(slug);
  if (!f) return <NotFound />;
  const partner = founderById(f.partnerId);
  const mine = ventures.filter((v) => v.leadership.some((l) => l.founderId === f.id));
  return (
    <>
      <header className="border-b border-line bg-navy/40">
        <div className="wrap grid items-center gap-10 py-14 md:grid-cols-[320px_1fr] md:py-20">
          <div className="arch mx-auto aspect-[4/5] w-full max-w-xs"><Photo f={f} priority /></div>
          <div>
            <h1 className="text-4xl sm:text-5xl">{f.name}{f.alternateName ? ` (${f.alternateName})` : ''}</h1>
            <p className="mt-3 text-lg text-goldlt">{f.labels}</p>
            {f.alternateName && <p className="mt-3 text-sm">{f.name} is professionally known as {f.alternateName}{f.otherNames?.length ? ` and also goes by ${f.otherNames.join(', ')} online` : ''}.</p>}
            <p className="mt-2 text-sm">Business partner: <Link className="text-white hover:text-goldlt" to={`/founders/${partner.slug}`}>{partner.name}</Link></p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <div>
              <h2 className="h2">Biography</h2>
              <div className="mt-5 max-w-2xl space-y-4 leading-relaxed">{f.bio.map((p) => <p key={p}>{p}</p>)}</div>
            </div>
            <div>
              <h2 className="h2">Entrepreneurial journey</h2>
              <div className="mt-5 max-w-2xl space-y-4 leading-relaxed">{f.journey.map((p) => <p key={p}>{p}</p>)}</div>
            </div>
            <div>
              <h2 className="h2">{f.id === 'yahayah' ? 'Financial and business responsibilities' : 'Leadership responsibilities'}</h2>
              <ul className="mt-5 list-disc space-y-2 pl-5">{f.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="card">
              <h2 className="text-xl">Skills</h2>
              <ul className="mt-4 flex flex-wrap gap-2">{f.skills.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1 text-xs">{s}</li>)}</ul>
            </div>
            <div className="card">
              <h2 className="text-xl">Roles</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {mine.map((v) => {
                  const role = v.leadership.find((l) => l.founderId === f.id)!.role;
                  return <li key={v.id}>{role} {/Engineer/.test(role) ? 'at' : 'of'} {v.website ? <Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}</Ext> : v.name}</li>;
                })}
                {(f.otherEmployers || []).map((e) => <li key={e}>Engineer at {e}</li>)}
              </ul>
            </div>
            {f.socials.length > 0 && (
              <div className="card">
                <h2 className="text-xl">Professional links</h2>
                <ul className="mt-4 space-y-2 text-sm">{f.socials.map((s) => <li key={s.url}><Ext className="text-goldlt hover:text-white" href={s.url}>{s.label}</Ext></li>)}</ul>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="section border-t border-line bg-navy/30">
        <div className="wrap">
          <h2 className="h2">Companies and projects</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">{mine.map((v) => <VentureCard key={v.id} v={v} />)}</div>
        </div>
      </section>
      <section className="section"><div className="wrap"><h2 className="h2 mb-8">Contact</h2><ContactBlock /></div></section>
    </>
  );
}
