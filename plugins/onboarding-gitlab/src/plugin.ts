import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const onboardingGitlabPlugin = createPlugin({
  id: 'onboarding-gitlab',
  routes: {
    root: rootRouteRef,
  },
});

export const OnboardingGitlabPage = onboardingGitlabPlugin.provide(
  createRoutableExtension({
    name: 'OnboardingGitlabPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
