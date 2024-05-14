import React from 'react';
import { Typography, Grid, Card, CardActionArea, CardContent, makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';

const useStyles = makeStyles({
  card: {
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  gridItem: {
    display: 'flex'
  }
});

export const ExampleComponent = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const systemRoutes = {
    GitLab: '/onboarding-gitlab',
    OpenShift: '/onboarding-openshift',
    Vault: '/onboarding-vault',
    JIRA: '/onboarding-jira',
    SonarQube: '/onboarding-sonarqube',
    Confluence: '/onboarding-confluence',
    // Add more systems and their routes here as needed
  };

  // Function to handle click on a tile
  const handleOnboardSystem = (systemName) => {
    console.log(`Onboarding to ${systemName}`);
    const route = systemRoutes[systemName];
    if (route) {
      navigate(route);
    } else {
      console.error(`No route defined for ${systemName}`);
    }
  };

  const systems = [
    { name: 'GitLab', description: 'Source control and CI/CD with GitLab.' },
    { name: 'OpenShift', description: 'Manage your OpenShift deployments.' },
    { name: 'Vault', description: 'Access management with HashiCorp Vault.' },
    { name: 'JIRA', description: 'Track your project with Atlassian JIRA.' },
    { name: 'SonarQube', description: 'Quality control with SonarQube.' },
    { name: 'Confluence', description: 'Document collaboratively with Confluence.' },
  ];

  return (
      <Page themeId="tool">
        <Header title="Welcome to onboarding!" subtitle="Select a system to onboard">
          <HeaderLabel label="Owner" value="Team X" />
          <HeaderLabel label="Lifecycle" value="Alpha" />
        </Header>
        <Content>
          <ContentHeader title="Choose a System">
            <SupportButton>A description of your plugin goes here.</SupportButton>
          </ContentHeader>
          <Grid container spacing={3}>
            {systems.map((system) => (
                <Grid item xs={12} sm={6} md={4} key={system.name} className={classes.gridItem}>
                  <Card className={classes.card} onClick={() => handleOnboardSystem(system.name)}>
                    <CardActionArea>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {system.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {system.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
            ))}
          </Grid>
        </Content>
      </Page>
  );
};
