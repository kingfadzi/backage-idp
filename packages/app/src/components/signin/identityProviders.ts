import { gitlabAuthApiRef } from '@backstage/core-plugin-api';

export const providers = [
    {
        id: 'gitlab',
        title: 'Gitlab',
        message: 'Sign in using Gitlab',
        apiRef: gitlabAuthApiRef,
        enableExperimentalRedirectFlow: true
    },
];