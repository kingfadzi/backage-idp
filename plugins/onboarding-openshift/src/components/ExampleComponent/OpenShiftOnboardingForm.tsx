import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; // Import Alert component for displaying errors

const useStyles = makeStyles({
    formControl: {
        minWidth: 120,
        width: '100%',
        marginBottom: '20px'
    },
});

const OpenShiftOnboardingForm = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: '',
        project: '',
        instance: '',
        environment: ''
    });
    const [error, setError] = useState(''); // State for handling errors

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        const apiUrl = 'http://your-backend-api-url/api/provision/openshift';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to provision user. Please try again.');
            }

            const result = await response.json();
            console.log(result);
            alert('User provisioned successfully!');
        } catch (error) {
            console.error('Failed to submit form:', error);
            setError(error.message || 'Unknown error occurred');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField label="Username" name="username" value={formData.username} onChange={handleChange} required fullWidth margin="normal" />
            <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required fullWidth margin="normal" />
            <FormControl fullWidth margin="normal" className={classes.formControl}>
                <InputLabel>Role</InputLabel>
                <Select name="role" value={formData.role} onChange={handleChange} required>
                    <MenuItem value="developer">Developer</MenuItem>
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="viewer">Viewer</MenuItem>
                </Select>
            </FormControl>
            <TextField label="Project/Namespace" name="project" value={formData.project} onChange={handleChange} required fullWidth margin="normal" />
            <FormControl className={classes.formControl}>
                <InputLabel>Instance</InputLabel>
                <Select name="instance" value={formData.instance} onChange={handleChange} required>
                    <MenuItem value="us-east">US East</MenuItem>
                    <MenuItem value="us-west">US West</MenuItem>
                    <MenuItem value="europe">Europe</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel>Environment</InputLabel>
                <Select name="environment" value={formData.environment} onChange={handleChange} required>
                    <MenuItem value="prod">Production</MenuItem>
                    <MenuItem value="non-prod">Non-Production</MenuItem>
                </Select>
            </FormControl>
            {error && <Alert severity="error">{error}</Alert>}
            <Button type="submit" color="primary" variant="contained" size="large">Submit</Button>
        </form>
    );
};

export default OpenShiftOnboardingForm;
