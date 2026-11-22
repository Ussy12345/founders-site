import { SITE, founders, ventures, projects, getFounder, getProject, founderById, ventureById, type Founder, type Venture } from './data/site';

export interface Meta {
  title: string; description: string; canonical: string; image: string;
  type: 'website' | 'profile'; noindex: boolean; jsonLd: Record<string, unknown>;
  images: string[];
}

const short = (s: string, n = 158) => (s.length <= n ? s : s.slice(0, n).replace(/\s+\S*$/, '') + '...');
export const abs = (p: string) => (p.startsWith('http') ? p : SITE.url + p);
const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';
const personId = (f: Founder) => `${SITE.url}/founders/${f.slug}#person`;
const orgId = (v: Venture) => `${SITE.url}/ventures#${v.slug}`;
const logoUrl = (v: Venture) => abs(v.logo + '.png');
const photoUrl = (f: Founder) => abs(f.photo + '.jpg');
const ogPhoto = (f: Founder) => abs(f.photo + '-og.jpg');

const websiteLd = () => ({
  '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url + '/', name: SITE.name,
  description: 'Official website of Usman Shehu (Zannur) and Yahayah Adam, founders and business partners behind Famzuk and RankRush.',
});

const personLd = (f: Founder) => {
  const ventureRefs = ventures.filter((v) => v.leadership.some((l) => l.founderId === f.id)).map((v) => ({ '@id': orgId(v) }));
  const other = (f.otherEmployers || []).map((name) => ({ '@type': 'Organization', name }));
  return {
    '@type': 'Person', '@id': personId(f), name: f.name,
    ...(f.alternateName ? { alternateName: f.otherNames?.length ? [f.alternateName, ...f.otherNames] : f.alternateName } : {}),
    jobTitle: f.jobTitle, description: f.summary, url: abs(`/founders/${f.slug}`),
    ...(f.photoReady ? { image: photoUrl(f) } : {}),
    worksFor: [...ventureRefs, ...other],
    knowsAbout: f.knowsAbout,
    colleague: { '@id': personId(founderById(f.partnerId)) },
    ...(f.socials.length ? { sameAs: f.socials.map((s) => s.url) } : {}),
  };
};

const orgLd = (v: Venture) => ({
  '@type': 'Organization', '@id': orgId(v), name: v.name, ...(v.website ? { url: v.website } : {}), description: v.description, ...(v.tagline ? { slogan: v.tagline } : {}), ...(v.email ? { email: v.email } : {}),
  logo: { '@type': 'ImageObject', url: logoUrl(v), width: 512, height: 512 },
  image: logoUrl(v),
  ...(v.founderIds.length ? { founder: v.founderIds.map((id) => ({ '@id': personId(founderById(id)) })) } : {}),
});

const graph = (...items: Record<string, unknown>[]) => ({ '@context': 'https://schema.org', '@graph': items });
const allPeople = () => founders.map(personLd);
const allOrgs = () => ventures.map(orgLd);
const logos = () => ventures.map(logoUrl);
const photos = () => founders.filter((f) => f.photoReady).map(photoUrl);

export const routes: string[] = [
  '/', '/our-partnership', '/ventures', '/projects', '/journey', '/contact',
  ...founders.map((f) => `/founders/${f.slug}`),
  ...projects.map((p) => `/projects/${p.slug}`),
];

export function pageMeta(rawPath: string): Meta {
  const path = norm(rawPath);
  const canonical = SITE.url + (path === '/' ? '/' : path);
  const base = { canonical, image: abs(SITE.ogDefault), type: 'website' as const, noindex: false };
  const founderPage = path.startsWith('/founders/') ? getFounder(path.split('/')[2]) : undefined;
  const projectPage = path.startsWith('/projects/') ? getProject(path.split('/')[2]) : undefined;

  if (founderPage) {
    const f = founderPage;
    return {
      ...base, title: f.metaTitle, description: f.metaDescription, type: 'profile',
      image: f.photoReady ? ogPhoto(f) : base.image,
      images: f.photoReady ? [photoUrl(f)] : [],
      jsonLd: graph(websiteLd(), { '@type': 'ProfilePage', '@id': canonical + '#page', url: canonical, name: f.metaTitle, mainEntity: { '@id': personId(f) } }, ...allPeople(), ...allOrgs()),
    };
  }
  if (projectPage) {
    const p = projectPage; const v = ventureById(p.ventureId);
    return {
      ...base, title: v.tagline ? `${p.name}: ${v.tagline} | Usman Shehu & Yahayah Adam` : `${p.name} | Project by Usman Shehu & Yahayah Adam`,
      description: short(v.description),
      image: logoUrl(v), images: [logoUrl(v)], jsonLd: graph(websiteLd(), orgLd(v), ...allPeople()),
    };
  }
  switch (path) {
    case '/':
      return { ...base, title: 'Usman Shehu & Yahayah Adam | Founders, Entrepreneurs & Technology Leaders',
        description: 'Official website of Usman Shehu (Zannur, ussydev), CEO and software engineer, and Yahayah Adam, CFO and co-founder. Founders of Famzuk, RankRush and LOT 10 FX.',
        images: [...photos(), ...logos()], jsonLd: graph(websiteLd(), ...allPeople(), ...allOrgs()) };
    case '/our-partnership':
      return { ...base, title: 'Usman Shehu & Yahayah Adam | Business Partners and Founders',
        description: 'Usman Shehu (Zannur) and Yahayah Adam are business partners and founders building technology ventures, websites and digital products, including Famzuk and RankRush.',
        images: photos(), jsonLd: graph(websiteLd(), { '@type': 'AboutPage', '@id': canonical + '#page', url: canonical, name: 'Usman Shehu & Yahayah Adam: Founders and Business Partners', about: founders.map((f) => ({ '@id': personId(f) })) }, ...allPeople(), ...allOrgs()) };
    case '/ventures':
      return { ...base, title: 'Our Ventures: Famzuk and RankRush | Usman Shehu & Yahayah Adam',
        description: 'Companies founded and led by Usman Shehu (Zannur) and Yahayah Adam: Famzuk, an educational technology platform, and RankRush, a rewards and competitions platform.',
        images: logos(), jsonLd: graph(websiteLd(), ...allOrgs(), ...allPeople()) };
    case '/projects':
      return { ...base, title: 'Projects and Digital Products | Usman Shehu & Yahayah Adam',
        description: 'Websites, platforms and digital products built by Usman Shehu (Zannur) and Yahayah Adam, including Famzuk and RankRush.',
        images: logos(), jsonLd: graph(websiteLd(), ...allOrgs()) };
    case '/journey':
      return { ...base, title: 'Our Journey | Usman Shehu & Yahayah Adam',
        description: 'The entrepreneurial journey of Usman Shehu (Zannur) and Yahayah Adam, from their first digital projects to Famzuk, RankRush and beyond.',
        images: [], jsonLd: graph(websiteLd()) };
    case '/contact':
      return { ...base, title: 'Contact Usman Shehu & Yahayah Adam',
        description: 'Get in touch with Usman Shehu (Zannur) and Yahayah Adam, or visit the official websites of Famzuk and RankRush.',
        images: [], jsonLd: graph(websiteLd()) };
    default:
      return { ...base, title: 'Page not found | Usman Shehu & Yahayah Adam', description: 'This page could not be found.', noindex: true, images: [], jsonLd: graph(websiteLd()) };
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function headTags(path: string): string {
  const m = pageMeta(path);
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${m.canonical}" />`,
    `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    `<meta property="og:type" content="${m.type}" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${m.canonical}" />`,
    `<meta property="og:image" content="${m.image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${m.image}" />`,
    ...(SITE.twitter ? [`<meta name="twitter:site" content="${esc(SITE.twitter)}" />`] : []),
    `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
  ];
  return tags.join('\n    ');
}

export const sitemapEntries = () => routes.map((p) => ({ loc: SITE.url + (p === '/' ? '/' : p), images: pageMeta(p).images }));
