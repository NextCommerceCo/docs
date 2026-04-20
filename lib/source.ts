import { docs, changelog } from 'collections/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export const changelogSource = loader({
  baseUrl: '/changelog',
  source: changelog.toFumadocsSource(),
});
