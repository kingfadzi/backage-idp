import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { onboardingPlugin, OnboardingPage } from '../src/plugin';

createDevApp()
  .registerPlugin(onboardingPlugin)
  .addPage({
    element: <OnboardingPage />,
    title: 'Root Page',
    path: '/onboarding',
  })
  .render();
