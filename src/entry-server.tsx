import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
export { headTags, routes, sitemapEntries } from './seo';
export { SITE } from './data/site';
