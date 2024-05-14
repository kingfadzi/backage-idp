import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const gitlabPlugin = createPlugin({
  id: 'gitlab',
  routes: {
    root: rootRouteRef,
  },
});

export const GitlabPage = gitlabPlugin.provide(
  createRoutableExtension({
    name: 'GitlabPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
