import { Link } from 'react-router-dom';
import { founders } from '../data/site';
import { Photo, PageHead } from '../components/ui';
import { VentureCard } from '../components/blocks';
import { ventures } from '../data/site';

const roles: Record<string, string> = {
  usman: 'CEO, technology leadership, software development, product development, innovation, and business direction.',
  yahayah: 'CFO, financial management, business planning, financial strategy, and business development.',
};

export default function Partnership() {
  return (
    <>
      <PageHead title="Usman Shehu & Yahayah Adam: Founders and Business Partners" intro="We work together building and managing technology projects, websites, businesses, and digital products. Each of us leads a different side of the work." />
      <section className="section">
        <div className="wrap grid gap-10 md:grid-cols-2">
          {founders.map((f) => (
            <article key={f.id}>
              <div className="arch mx-auto aspect-[4/5] max-w-sm"><Photo f={f} /></div>
              <h2 className="mt-6 text-3xl"><Link to={`/founders/${f.slug}`}>{f.name}{f.alternateName ? ` (${f.alternateName})` : ''}</Link></h2>
              <p className="mt-1 text-goldlt">{f.labels}</p>
              <p className="mt-4 leading-relaxed">{roles[f.id]}</p>
              <Link to={`/founders/${f.slug}`} className="btn btn-ghost mt-5">View {f.name.split(' ')[0]}&rsquo;s profile</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section border-t border-line bg-navy/40">
        <div className="wrap">
          <h2 className="h2">What connects us</h2>
          <p className="lead mt-4">Usman Shehu (also known as Zannur and ussydev) and Yahayah Adam are co-founders of multiple ventures, including Famzuk, RankRush and LOT 10 FX, and of other websites, businesses, and projects built together.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">{ventures.map((v) => <VentureCard key={v.id} v={v} />)}</div>
        </div>
      </section>
    </>
  );
}
