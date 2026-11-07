import { Motion } from '@/components/Motion';
import { Contact } from '@/components/sections/Contact';
import { Experience } from '@/components/sections/Experience';
import { Hero } from '@/components/sections/Hero';
import { Nav } from '@/components/sections/Nav';
import { Stack } from '@/components/sections/Stack';
import { Work } from '@/components/sections/Work';
import { experience } from '@/lib/content';
import { site } from '@/lib/site';

// structured data so search engines can show a rich profile result for the name
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: site.url,
  name: site.title,
  mainEntity: {
    '@type': 'Person',
    name: site.name,
    alternateName: site.short,
    url: site.url,
    image: `${site.url}/char.png`,
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle,
    description: site.description,
    worksFor: { '@type': 'Organization', name: site.employer, url: 'https://sg-edts.com' },
    address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: site.country },
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Universitas Gadjah Mada' },
    hasOccupation: experience.map((e) => ({ '@type': 'Occupation', name: e.role, description: `${e.company}, ${e.dates}` })),
    knowsAbout: site.skills,
    knowsLanguage: ['Indonesian', 'English'],
    sameAs: site.sameAs,
  },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <Work />
        <Experience />
        <Stack />
      </main>
      <Contact />
      <Motion />
    </>
  );
}
