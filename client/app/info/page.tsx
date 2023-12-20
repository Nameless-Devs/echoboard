"use client"
// pages/DeveloperPage.js
import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Card,
    CardContent,
    Avatar,
    IconButton
} from '@mui/material';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import CustomNavBar from '@/components/CustomNavBar';
import Footer from '../home/Footer';
import { developers } from '@/service/DevelopersInfo';

interface DeveloperCardProps {
    name: string;
    role: string;
    avatar: string;
    info: string;
    linkedin: string;
    github: string;

}

const buttons = [
    {label: 'Landing Page', link: '/home'},
    {label: 'Home', link: '/'}
  ];

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, avatar, info,linkedin, github}) => (
    <Card elevation={3} style={{ height: '100%', borderRadius: '15px' }}>
        <Avatar src={"/Devs_avatars/" + avatar } alt={name + "avatar picture"} sx={{ width: 120, height: 120, margin: 'auto', marginTop: '2rem' }} />
        <CardContent>
            <Typography variant="h6" align="center">
                <p>{name}</p>
            </Typography>
            <Typography color="textSecondary" variant="subtitle2" align="center" paddingBottom={"1rem"}>
                {role}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="center">
                {info}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                {linkedin && (
                    <IconButton color="primary" href={linkedin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon />
                    </IconButton>
                )}
                {github && (
                    <IconButton color="primary" href={github} target="_blank" rel="noopener noreferrer" size='large'>
                        <GitHubIcon />
                    </IconButton>
                )}
            </div>
        </CardContent>
    </Card>
);

const DeveloperPage = () => {

    return (
        <>
        <CustomNavBar buttons={buttons} />
            <Container maxWidth="lg" sx={{ margin: '2rem auto 4rem' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h3" gutterBottom align="center">
                            Developer Page
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper elevation={3} style={{ padding: '2rem' }}>
                            <Typography variant="body1" align="center">
                                Welcome to the Developer Page! Here you can find information and resources for developers working on our project.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom align="center">
                            Meet the Team
                        </Typography>
                        <Grid container spacing={2}>
                            {developers.map((developer, index) => (
                                <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
                                    <DeveloperCard {...developer} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default DeveloperPage;
