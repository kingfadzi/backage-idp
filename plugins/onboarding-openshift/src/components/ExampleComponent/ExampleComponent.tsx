import React from 'react';
import { Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import OpenShiftOnboardingForm from './OpenShiftOnboardingForm'; // Ensure this path is correct

export const ExampleComponent = () => (
    <Page themeId="tool">
      <Header title="Welcome to onboarding-openshift!" subtitle="Onboard to OpenShift">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Onboarding Form">
          <SupportButton>This form allows you to onboard new users to OpenShift.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <InfoCard>
              <OpenShiftOnboardingForm />
            </InfoCard>
          </Grid>
        </Grid>
      </Content>
    </Page>
);
