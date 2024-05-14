import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { onboardingGitlabPlugin, OnboardingGitlabPage } from '../src/plugin';

createDevApp()
  .registerPlugin(onboardingGitlabPlugin)
  .addPage({
    element: <OnboardingGitlabPage />,
    title: 'Root Page',
    path: '/onboarding-gitlab',
  })
  .render();
