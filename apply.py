"""Run from the project root:  python3 apply.py
Applies: Yahayah spelling, ussydev alias, Aniaja + LOT 10 FX entries."""
import os, re, sys

def read(p):
    with open(p, encoding='utf-8') as f: return f.read()
def write(p, s):
    with open(p, 'w', encoding='utf-8') as f: f.write(s)
def sub(path, old, new, all_=False):
    s = read(path)
    if new in s:
        return print('skip (already done):', old[:50].replace(chr(10), ' '))
    n = s.count(old)
    if n == 0:
        return print('NOT FOUND, skipped:', old[:50].replace(chr(10), ' '))
    if n > 1 and not all_:
        sys.exit('ERROR: %d matches in %s' % (n, path))
    write(path, s.replace(old, new))

if not os.path.exists('src/data/site.ts'):
    sys.exit('Run this from the project root (the folder containing src/).')

# 1. Spelling: Yahah -> Yahayah (names, slug, photo filenames). Internal id "yahah" is unchanged.
for root in ('src', 'scripts'):
    for d, _, fs in os.walk(root):
        for f in fs:
            p = os.path.join(d, f); s = read(p)
            t = re.sub(r'\bYahah\b', 'Yahayah', s.replace('yahah-adam', 'yahayah-adam'))
            if t != s: write(p, t)
p = 'README.md'; s = read(p)
write(p, re.sub(r'\bYahah\b', 'Yahayah', s.replace('yahah-adam', 'yahayah-adam')))

S = 'src/data/site.ts'
# 2. ussydev alias
sub(S, "  alternateName?: string;", "  alternateName?: string;\n  otherNames?: string[]; // other names/handles people search for")
sub(S, "    alternateName: 'Zannur',", "    alternateName: 'Zannur',\n    otherNames: ['ussydev'],")
sub(S, "Usman Shehu, also known as Zannur, is a technology entrepreneur and software engineer. CEO of Famzuk, founder of RankRush, and business partner of Yahayah Adam.",
       "Usman Shehu, also known as Zannur and ussydev, is a software engineer and entrepreneur. CEO of Famzuk, founder of RankRush, partner of Yahayah Adam.")
sub(S, "    otherEmployers: ['Aniaja Company'],\n", "")   # Aniaja is now a venture entry below

# 3. Optional website
sub(S, "  website: string;", "  website?: string; // leave out until there is one", all_=True)

# 4. New ventures + project
sub(S, "    offerings: ['RankRush rewards and competitions platform'],\n  },\n];", """    offerings: ['RankRush rewards and competitions platform'],
  },
  {
    id: 'lot-10-fx',
    slug: 'lot-10-fx',
    name: 'LOT 10 FX',
    category: 'Digital project', // TODO: replace with the real category
    description: 'LOT 10 FX is a project built and managed by Usman Shehu and Yahayah Adam.', // TODO: fuller description
    // website: 'https://...', // TODO: add when available
    logo: '/images/lot-10-fx-logo',
    logoAlt: 'LOT 10 FX logo, a globe with a golden rising arrow beside the letters 10 FX',
    leadership: [
      { founderId: 'usman', role: 'Co-Founder' }, // TODO: confirm roles
      { founderId: 'yahah', role: 'Co-Founder' },
    ],
    founderIds: ['usman', 'yahah'],
    offerings: [],
  },
  {
    id: 'aniaja',
    slug: 'aniaja',
    name: 'Aniaja Company',
    category: 'Company',
    description: 'Aniaja Company is where Usman Shehu works as an engineer.',
    // website: 'https://...', // TODO: add Aniaja's website if you want it linked
    logo: '/images/aniaja-logo',
    logoAlt: 'Aniaja logo, a neon green rounded play-button shape on a black background',
    leadership: [{ founderId: 'usman', role: 'Engineer' }],
    founderIds: [],
    offerings: [],
  },
];""")
sub(S, "Yahayah Adam: CFO, financial management and business planning'],\n  },\n];", """Yahayah Adam: CFO, financial management and business planning'],
  },
  {
    slug: 'lot-10-fx',
    name: 'LOT 10 FX',
    ventureId: 'lot-10-fx',
    description: 'A project built and managed by Usman Shehu and Yahayah Adam.', // TODO: describe it
    technologies: [], // TODO
    // website: 'https://...', // TODO
    involvement: ['Usman Shehu and Yahayah Adam: built and managed together'], // TODO: refine
  },
];""")

# 5. Components: tolerate ventures/projects without a website, hide empty rows
B = 'src/components/blocks.tsx'
sub(B, "timeline, ventures, type Project", "projects, timeline, ventures, type Project")
sub(B, """        <div className="flex gap-2">
          <dt className="w-32 shrink-0 text-slate-400">Products</dt>
          <dd>{v.offerings.join(', ')}</dd>
        </div>""", """        {v.offerings.length > 0 && (
          <div className="flex gap-2">
            <dt className="w-32 shrink-0 text-slate-400">Products</dt>
            <dd>{v.offerings.join(', ')}</dd>
          </div>
        )}""")
sub(B, """        <Ext href={v.website} className="btn btn-gold">Visit {v.name}</Ext>
        <Link to={`/projects/${v.slug}`} className="btn btn-ghost">Project details</Link>""",
"""        {v.website && <Ext href={v.website} className="btn btn-gold">Visit {v.name}</Ext>}
        {projects.some((p) => p.slug === v.slug) && <Link to={`/projects/${v.slug}`} className="btn btn-ghost">Project details</Link>}""")
sub(B, """<Ext href={p.website} className="btn btn-gold">Visit website</Ext>""", """{p.website && <Ext href={p.website} className="btn btn-gold">Visit website</Ext>}""")
sub(B, """{ventures.map((v) => <li key={v.id}><Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}: {v.website.replace('https://', '')}</Ext></li>)}""",
"""{ventures.filter((v) => v.website).map((v) => <li key={v.id}><Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}: {v.website!.replace('https://', '')}</Ext></li>)}""")
sub('src/components/Layout.tsx', """<li key={v.id}><Ext className="hover:text-goldlt" href={v.website}>{v.name}</Ext></li>""",
"""<li key={v.id}>{v.website ? <Ext className="hover:text-goldlt" href={v.website}>{v.name}</Ext> : v.name}</li>""")
sub('src/pages/Others.tsx', """<Ext href={p.website} className="btn btn-gold">Visit {p.name}</Ext>""", """{p.website && <Ext href={p.website} className="btn btn-gold">Visit {p.name}</Ext>}""")
F = 'src/pages/FounderPage.tsx'
sub(F, """{mine.map((v) => <li key={v.id}>{v.leadership.find((l) => l.founderId === f.id)!.role} of <Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}</Ext></li>)}""",
"""{mine.map((v) => {
                  const role = v.leadership.find((l) => l.founderId === f.id)!.role;
                  return <li key={v.id}>{role} {role === 'Engineer' ? 'at' : 'of'} {v.website ? <Ext className="text-goldlt hover:text-white" href={v.website}>{v.name}</Ext> : v.name}</li>;
                })}""")
sub(F, """is professionally known as {f.alternateName}.</p>""", """is professionally known as {f.alternateName}{f.otherNames?.length ? ` and also goes by ${f.otherNames.join(', ')} online` : ''}.</p>""")

# 6. SEO: alias in structured data, optional url/founder, descriptions
E = 'src/seo.ts'
sub(E, "...(f.alternateName ? { alternateName: f.alternateName } : {}),", "...(f.alternateName ? { alternateName: f.otherNames?.length ? [f.alternateName, ...f.otherNames] : f.alternateName } : {}),")
sub(E, "name: v.name, url: v.website, description: v.description,", "name: v.name, ...(v.website ? { url: v.website } : {}), description: v.description,")
sub(E, "founder: v.founderIds.map((id) => ({ '@id': personId(founderById(id)) })),", "...(v.founderIds.length ? { founder: v.founderIds.map((id) => ({ '@id': personId(founderById(id)) })) } : {}),")
sub(E, "Official website of Usman Shehu (Zannur), CEO and software engineer, and Yahayah Adam, CFO and co-founder. Founders of Famzuk, RankRush and other ventures.",
       "Official website of Usman Shehu (Zannur, ussydev), CEO and software engineer, and Yahayah Adam, CFO and co-founder. Founders of Famzuk, RankRush and LOT 10 FX.")

# 7. Visible text so searches for the handle match real page content
sub('src/pages/Home.tsx', "business planning as CFO.</p>", "business planning as CFO. Usman is also known online as Zannur and ussydev.</p>")
sub('src/pages/Partnership.tsx', "Usman Shehu (also known as Zannur) and Yahayah Adam are co-founders of multiple ventures, including Famzuk and RankRush,",
    "Usman Shehu (also known as Zannur and ussydev) and Yahayah Adam are co-founders of multiple ventures, including Famzuk, RankRush and LOT 10 FX,")
print('Done. Now run: npm run build')
