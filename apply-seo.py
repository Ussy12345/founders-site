import os, sys
def read(p): return open(p, encoding='utf-8').read()
def write(p, s): open(p, 'w', encoding='utf-8').write(s)
def sub(path, old, new):
    s = read(path)
    if new in s: return print('skip (done):', old[:55].replace('\n', ' '))
    if s.count(old) != 1: return print('NOT FOUND / not unique:', old[:55].replace('\n', ' '))
    write(path, s.replace(old, new)); print('ok:', old[:55].replace('\n', ' '))
if not os.path.exists('src/seo.ts'): sys.exit('Run this from the project root.')

S, E, H = 'src/data/site.ts', 'src/seo.ts', 'src/pages/Home.tsx'

# 1. Visible FAQ content (plain, factual answers: good for search snippets and AI summaries)
if 'export const faqs' not in read(S):
    write(S, read(S) + r'''
export const faqs: { q: string; a: string }[] = [
  { q: 'Who are Usman Shehu and Yahayah Adam?', a: 'Usman Shehu (also known as Zannur and ussydev) and Yahayah Adam are entrepreneurs, business partners and co-founders building digital products, technology ventures and businesses, including Famzuk and RankRush.' },
  { q: 'Who is Usman Shehu (Zannur, ussydev)?', a: 'Usman Shehu, professionally known as Zannur and also as ussydev, is a technology entrepreneur and software engineer. He is CEO of Famzuk, founder and CEO of RankRush, and founder and chief engineer of Aniaja Company, and he works with his business partner Yahayah Adam.' },
  { q: 'Who is Yahayah Adam?', a: 'Yahayah Adam is an entrepreneur and Chief Financial Officer of Famzuk and RankRush. He is a co-founder and the business partner of Usman Shehu, and handles financial management, business planning and business development.' },
  { q: 'Who runs Famzuk?', a: 'Famzuk is led by Usman Shehu as CEO and Yahayah Adam as CFO. Famzuk is an academic learning platform with AI-powered assistance, flashcards, exam practice for JAMB, WAEC and NECO, and study tools.' },
  { q: 'Who runs RankRush?', a: 'RankRush is led by Usman Shehu as Founder and CEO and Yahayah Adam as CFO. RankRush is a competitive quiz, learning and rewards platform with XP, coins, surveys and seasonal leaderboards.' },
  { q: 'Is Zannur the same person as Usman Shehu?', a: 'Yes. Zannur and ussydev are other names that Usman Shehu is known by.' },
];
''')
    print('ok: faqs added')
sub(S, "ogDefault: '/images/og-default.png',", "ogDefault: '/images/og-founders.jpg',")

# 2. Structured data: FAQ, richer photo objects, application name, founders named in project descriptions
sub(E, "type Founder, type Venture } from './data/site';", "type Founder, type Venture, faqs } from './data/site';")
sub(E, "const graph = (...items: Record<string, unknown>[])", """const faqLd = () => ({ '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const graph = (...items: Record<string, unknown>[])""")
sub(E, "...(f.photoReady ? { image: photoUrl(f) } : {}),",
       "...(f.photoReady ? { image: { '@type': 'ImageObject', url: photoUrl(f), contentUrl: photoUrl(f), name: f.name, caption: f.photoAlt, width: 800, height: 1000 } } : {}),")
sub(E, "jsonLd: graph(websiteLd(), ...allPeople(), ...allOrgs()) };", "jsonLd: graph(websiteLd(), ...allPeople(), ...allOrgs(), faqLd()) };")
sub(E, "`<meta name=\"author\" content=\"Usman Shehu and Yahayah Adam\" />`,", "`<meta name=\"author\" content=\"Usman Shehu and Yahayah Adam\" />`,\n    `<meta name=\"application-name\" content=\"${esc(SITE.name)}\" />`,")
LEAD = "`${v.name} is led by ${v.leadership.map((l) => `${founderById(l.founderId).name} (${l.role})`).join(' and ')}. ${v.description}`"
sub(E, "description: short(v.description),", "description: short(" + LEAD + "),")
sub(E, "description: `${p.description} Built and managed by Usman Shehu (Zannur) and Yahayah Adam.`.slice(0, 200),", "description: (" + LEAD + ").slice(0, 200),")

# 3. Home page FAQ section
sub(H, "import { founders, projects, ventures } from '../data/site';", "import { faqs, founders, projects, ventures } from '../data/site';")
sub(H, '<Section title="Contact"><ContactBlock /></Section>', '''<Section title="Frequently asked questions">
        <dl className="grid gap-4 lg:grid-cols-2">
          {faqs.map((f) => (
            <div key={f.q} className="card">
              <dt className="font-serif text-lg text-white">{f.q}</dt>
              <dd className="mt-2 text-sm leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
      <Section title="Contact"><ContactBlock /></Section>''')

# 4. Favicon for Google (it asks for a crawlable icon, ideally also /favicon.ico)
sub('index.html', '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />', '<link rel="icon" href="/favicon.svg" type="image/svg+xml" />\n    <link rel="icon" href="/favicon.ico" sizes="48x48" />')
print('Done. Now run: npm run build')
