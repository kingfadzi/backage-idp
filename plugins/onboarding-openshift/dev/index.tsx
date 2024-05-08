import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { onboardingOpenshiftPlugin, OnboardingOpenshiftPage } from '../src/plugin';

createDevApp()
  .registerPlugin(onboardingOpenshiftPlugin)
  .addPage({
    element: <OnboardingOpenshiftPage />,
    title: 'Root Page',
    path: '/onboarding-openshift',
  })
  .render();
