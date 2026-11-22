import { Link } from 'react-router-dom';
import { founders, projects, ventures } from '../data/site';
import { Photo, Section, FounderCard } from '../components/ui';
import { Achievements, ContactBlock, ProjectCard, Timeline, VentureCard } from '../components/blocks';

export default function Home() {
  return (
    <>
      <section className="border-b border-line bg-gradient-to-b from-navy to-ink">
        <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-2 lg:py-24">
          <div className="rise">
            <h1 className="text-4xl leading-[1.1] sm:text-6xl">Building Technology. Creating Opportunities.</h1>
            <p className="lead mt-6">We are Usman Shehu and Yahayah Adam. We are entrepreneurs, business partners, and founders building digital products, technology ventures, and innovative businesses.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/our-partnership" className="btn btn-gold">Meet the Founders</Link>
              <Link to="/ventures" className="btn btn-ghost">Explore Our Ventures</Link>
              <Link to="/projects" className="btn btn-ghost">View Our Projects</Link>
            </div>
          </div>
          <div className="rise-2 grid grid-cols-2 gap-4 sm:gap-6">
            {founders.map((f, i) => (
              <figure key={f.id} className={i === 1 ? 'mt-10' : ''}>
                <Link to={`/founders/${f.slug}`} aria-label={`${f.name} profile`}>
                  <div className="arch aspect-[4/5]"><Photo f={f} priority /></div>
                </Link>
                <figcaption className="mt-3">
                  <p className="font-serif text-lg text-white">{f.name}{f.alternateName ? ` (${f.alternateName})` : ''}</p>
                  <p className="text-xs text-goldlt sm:text-sm">{f.labels}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <Section title="The founders" intro="Two entrepreneurs with complementary roles: technology and product on one side, finance and business planning on the other.">
        <div className="grid gap-6 lg:grid-cols-2">{founders.map((f) => <FounderCard key={f.id} f={f} />)}</div>
      </Section>

      <section className="section border-y border-line bg-navy/40">
        <div className="wrap max-w-3xl">
          <h2 className="h2">Our partnership</h2>
          <p className="lead mt-4">Usman Shehu and Yahayah Adam work together building and managing technology projects, websites, businesses, and digital products. Usman leads technology, product, and business direction as CEO. Yahayah leads financial management and business planning as CFO. Usman is also known online as Zannur and ussydev.</p>
          <Link to="/our-partnership" className="btn btn-ghost mt-6">About our partnership</Link>
        </div>
      </section>

      <Section title="Companies and ventures">
        <div className="grid gap-6 lg:grid-cols-2">{ventures.map((v) => <VentureCard key={v.id} v={v} />)}</div>
      </Section>

      <Section title="Featured projects">
        <div className="grid gap-6 lg:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
      </Section>

      <Section title="Our journey" intro="The path from our first digital projects to the ventures we run today.">
        <Timeline />
      </Section>

      <Section title="Roles and milestones"><Achievements /></Section>
      <Section title="Contact"><ContactBlock /></Section>
    </>
  );
}
