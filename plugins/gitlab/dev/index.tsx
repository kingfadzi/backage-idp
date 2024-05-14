import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { gitlabPlugin, GitlabPage } from '../src/plugin';

createDevApp()
  .registerPlugin(gitlabPlugin)
  .addPage({
    element: <GitlabPage />,
    title: 'Root Page',
    path: '/gitlab',
  })
  .render();
