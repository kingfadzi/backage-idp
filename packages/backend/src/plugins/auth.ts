import { createBackendModule } from '@backstage/backend-plugin-api';
import {
    authProvidersExtensionPoint,
    createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { gitlabAuthenticator } from '@backstage/plugin-auth-backend-module-gitlab-provider';
import { googleAuthenticator } from '@backstage/plugin-auth-backend-module-google-provider';

const customAuthModule = createBackendModule({
    pluginId: 'auth',
    moduleId: 'custom-auth-module',
    register(reg) {
        reg.registerInit({
            deps: { providers: authProvidersExtensionPoint },
            async init({ providers }) {
                // Register GitLab Authentication
                providers.registerProvider({
                    providerId: 'gitlab',
                    factory: createOAuthProviderFactory({
                        authenticator: gitlabAuthenticator,
                        signInResolver(info, ctx) {
                            const userRef = `user:default/${info.result.fullProfile.username}`;
                            return ctx.issueToken({
                                claims: {
                                    sub: userRef,
                                    ent: [userRef],
                                },
                            });
                        },
                    }),
                });

                // Register Google Authentication
                providers.registerProvider({
                    providerId: 'google',
                    factory: createOAuthProviderFactory({
                        authenticator: googleAuthenticator,
                        signInResolver(info, ctx) {
                            const userRef = `user:default/${info.result.fullProfile.username}`;
                            return ctx.issueToken({
                                claims: {
                                    sub: userRef,
                                    ent: [userRef],
                                },
                            });
                        },
                    }),
                });
            },
        });
    },
});

export default customAuthModule;
