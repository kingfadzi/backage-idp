import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Link } from '@material-ui/core';
import { InfoCard, Header, Page, Content, ContentHeader, HeaderLabel, SupportButton } from '@backstage/core-components';
import { useApi, configApiRef } from '@backstage/core-plugin-api';

export const ExampleComponent = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    name: '',
    password: '',
    projectName: '',
    businessApplicationId: ''
  });

  const [gitlabLink, setGitlabLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track form submission status

  const config = useApi(configApiRef);
  const backendUrl = config.getOptionalString('backend.baseUrl');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `${backendUrl}/api/proxy/onboard-gitlab/create-user`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();  // Parse JSON from the response

      if (!response.ok) {
        alert(data.message);  // Display the server message
        console.error('Server Response:', data);
        return;  // Exit the function after handling the error
      }

      // Set the link and update submission status
      setGitlabLink('https://eros.butterflycluster.com');
      setIsSubmitted(true); // Update the submission status to true
      console.log('Server Response:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error in processing your request: ' + error.message);
    }
  };

  return (
      <Page themeId="tool">
        <Header title="Welcome to onboarding-gitlab!" subtitle="Complete the form below to onboard">
          <HeaderLabel label="Owner" value="Team X" />
          <HeaderLabel label="Lifecycle" value="Alpha" />
        </Header>
        <Content>
          <ContentHeader title="GitLab Onboarding Form">
            <SupportButton>A description of your plugin goes here.</SupportButton>
          </ContentHeader>
          <Grid container spacing={3} direction="column">
            <Grid item>
              <InfoCard title="Fill out the form to onboard to GitLab">
                {isSubmitted ? (
                    <Typography variant="h6" style={{ marginTop: 20 }}>
                      Welcome to GitLab! You can now access your GitLab project here:
                      <Link href={gitlabLink} target="_blank" style={{ display: 'block', marginTop: 10 }}>Go to GitLab</Link>
                    </Typography>
                ) : (
                    <form onSubmit={handleSubmit}>
                      <TextField label="Email" variant="outlined" name="email" value={formData.email} onChange={handleChange} fullWidth margin="normal"/>
                      <TextField label="Username" variant="outlined" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal"/>
                      <TextField label="Name" variant="outlined" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal"/>
                      <TextField label="Password" variant="outlined" type="password" name="password" value={formData.password} onChange={handleChange} fullWidth margin="normal"/>
                      <TextField label="Project Name" variant="outlined" name="projectName" value={formData.projectName} onChange={handleChange} fullWidth margin="normal"/>
                      <TextField label="Business Application ID" variant="outlined" name="businessApplicationId" value={formData.businessApplicationId} onChange={handleChange} fullWidth margin="normal"/>
                      <Button type="submit" color="primary" variant="contained">Submit</Button>
                    </form>
                )}
              </InfoCard>
            </Grid>
          </Grid>
        </Content>
      </Page>
  );
};
