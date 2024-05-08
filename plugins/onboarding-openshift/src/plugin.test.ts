import { onboardingOpenshiftPlugin } from './plugin';

describe('onboarding-openshift', () => {
  it('should export plugin', () => {
    expect(onboardingOpenshiftPlugin).toBeDefined();
  });
});
