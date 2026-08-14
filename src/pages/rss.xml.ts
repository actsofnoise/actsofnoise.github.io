import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const escapeXml = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const base = site ?? new URL('https://example.com');
  const items = posts.map((post) => {
    const url = new URL(`/blog/${post.id}/`, base).href;
    return `
      <item>
        <title>${escapeXml(post.data.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid isPermaLink="true">${escapeXml(url)}</guid>
        <pubDate>${post.data.date.toUTCString()}</pubDate>
        <category>${escapeXml(post.data.category)}</category>
        ${post.data.description ? `<description>${escapeXml(post.data.description)}</description>` : ''}
      </item>`;
  }).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Esquina personal</title>
    <link>${escapeXml(base.href)}</link>
    <description>Textos y cosas guardadas en una esquina personal de Internet.</description>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
