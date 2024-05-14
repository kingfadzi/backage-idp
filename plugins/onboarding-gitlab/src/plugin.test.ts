import { onboardingGitlabPlugin } from './plugin';

describe('onboarding-gitlab', () => {
  it('should export plugin', () => {
    expect(onboardingGitlabPlugin).toBeDefined();
  });
});
