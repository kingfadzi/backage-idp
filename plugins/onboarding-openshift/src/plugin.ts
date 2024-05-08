import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const onboardingOpenshiftPlugin = createPlugin({
  id: 'onboarding-openshift',
  routes: {
    root: rootRouteRef,
  },
});

export const OnboardingOpenshiftPage = onboardingOpenshiftPlugin.provide(
  createRoutableExtension({
    name: 'OnboardingOpenshiftPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
