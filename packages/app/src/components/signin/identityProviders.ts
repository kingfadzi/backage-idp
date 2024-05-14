import {googleAuthApiRef} from '@backstage/core-plugin-api';

export const providers = [

    {
        id: 'google',
        title: 'Google',
        message: 'Sign in using Google',
        apiRef: googleAuthApiRef,
        enableExperimentalRedirectFlow: true
    },
];