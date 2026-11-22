import { Link, useParams } from 'react-router-dom';
import { founderById, getProject, projects, ventureById, ventures } from '../data/site';
import { Ext, Logo, PageHead } from '../components/ui';
import { ContactBlock, ProjectCard, Timeline, VentureCard } from '../components/blocks';

export const VenturesPage = () => (
  <>
    <PageHead title="Our Ventures" intro="Companies founded and led by Usman Shehu and Yahayah Adam." />
    <div className="wrap section grid gap-6 lg:grid-cols-2">{ventures.map((v) => <VentureCard key={v.id} v={v} />)}</div>
  </>
);

export const ProjectsPage = () => (
  <>
    <PageHead title="Projects and Digital Products" intro="Websites and platforms we have built and manage." />
    <div className="wrap section grid gap-6 lg:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>
  </>
);

export function ProjectDetail() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  if (!p) return <NotFound />;
  const v = ventureById(p.ventureId);
  return (
    <>
      <PageHead title={p.name} intro={v.description} />
      <div className="wrap section grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {v.tagline && <p className="font-serif text-2xl text-goldlt">{v.tagline}</p>}
          {v.about.length > 0 && <div className="max-w-2xl space-y-4 leading-relaxed">{v.about.map((t) => <p key={t}>{t}</p>)}</div>}
          {v.features.length > 0 && (
            <div>
              <h2 className="text-2xl">Core features</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">{v.features.map((x) => <li key={x} className="card py-3 text-sm">{x}</li>)}</ul>
            </div>
          )}
          {v.mission && <div><h2 className="text-2xl">Mission</h2><p className="mt-3 max-w-2xl leading-relaxed">{v.mission}</p></div>}
          <div>
            <h2 className="text-2xl">Founder involvement</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5">{p.involvement.map((i) => <li key={i}>{i}</li>)}</ul>
          </div>
          {p.status && <p>Status: {p.status}</p>}
          {p.technologies.length > 0 && (
            <div><h2 className="text-2xl">Technologies</h2><ul className="mt-4 flex flex-wrap gap-2">{p.technologies.map((t) => <li key={t} className="rounded-full border border-line px-3 py-1 text-sm">{t}</li>)}</ul></div>
          )}
          {v.email && <p>Contact: <a className="text-goldlt hover:text-white" href={`mailto:${v.email}`}>{v.email}</a></p>}
          <div className="flex flex-wrap gap-3">
            {p.website && <Ext href={p.website} className="btn btn-gold">Visit {p.name}</Ext>}
            <Link to="/projects" className="btn btn-ghost">All projects</Link>
          </div>
        </div>
        <aside className="card self-start">
          <Logo v={v} size={96} />
          <p className="mt-4 font-serif text-xl text-white">{v.name}</p>
          <p className="text-sm text-goldlt">{v.category}</p>
          <ul className="mt-4 space-y-1 text-sm">{v.leadership.map((l) => <li key={l.founderId}>{l.role}: <Link className="hover:text-goldlt" to={`/founders/${founderById(l.founderId).slug}`}>{founderById(l.founderId).name}</Link></li>)}</ul>
        </aside>
      </div>
    </>
  );
}

export const JourneyPage = () => (
  <>
    <PageHead title="Our Journey" intro="The entrepreneurial path of Usman Shehu and Yahayah Adam." />
    <div className="wrap section"><Timeline /></div>
  </>
);

export const ContactPage = () => (
  <>
    <PageHead title="Contact" intro="Reach Usman Shehu and Yahayah Adam, or visit our company websites." />
    <div className="wrap section"><ContactBlock /></div>
  </>
);

export const NotFound = () => (
  <div className="wrap section text-center">
    <h1 className="text-4xl">Page not found</h1>
    <p className="lead mx-auto mt-4">This page does not exist. Try the homepage or one of the founder profiles.</p>
    <Link to="/" className="btn btn-gold mt-8">Go to homepage</Link>
  </div>
);
