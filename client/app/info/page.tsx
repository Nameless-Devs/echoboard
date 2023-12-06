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
    AppBar,
    Toolbar,
    Stack,
    Button, IconButton
} from '@mui/material';
import Box from "@mui/material/Box";
import EchoBoardLogo from "@/components/EchoBoardLogo";
import {useRouter} from "next/navigation";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface DeveloperCardProps {
    name: string;
    role: string;
    avatar: string;
    info: string;
    linkedin: string;
    github: string;

}

const developers = [
    { name: 'Anastasia Kurayshevich', role: 'Full-stack Developer',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQHI1MQPvVOh2g/profile-displayphoto-shrink_200_200/0/1694881637326?e=1707350400&v=beta&t=hq4KuZHf46BIZ29rg95Qq4w8R4iwrI-F1bNJaDvlf54',
        info: "Creative Java developer with a background in the restaurant industry. Enjoys problem-solving and continuous learning. Outside work, passionate about pottery, healthy cooking, and various sports.",
        linkedin: "https://www.linkedin.com/in/anastasia-kurayshevich/",
        github: "https://github.com/AnastasiaKurayshevich"
    },
    { name: 'Nate Tklay Arafayne', role: 'Full-stack Developer',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQHArFTOOuO0lg/profile-displayphoto-shrink_800_800/0/1690207852437?e=1707350400&v=beta&t=q7h_-b5RQ5Ei0LOibDqBO8QtadvhQt972Qo5cQ1ArZA',
        info: "Former military professional turned software engineer with a love for solving complex problems. Thrives on continuous learning and embraces challenges within the dynamic field of technology.",
        linkedin: "https://www.linkedin.com/in/nate-tklay-arafayne-20898925a/",
        github: "https://github.com/NateAra"
    },
    { name: 'Ibrahim Iqbal', role: 'Full-stack Developer',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQGLAkaNDEHyWQ/profile-displayphoto-shrink_800_800/0/1673879320515?e=1707350400&v=beta&t=nTWcCLx_9zqh-QuKFDJFyyjJUwZvMrx2Pw0hQC1gWis',
        info: "Dedicated Java developer with a passion for coding and backend development. Thrives on challenges and innovation. Seeking to bring expertise and dedication to your company.",
        linkedin: "https://www.linkedin.com/in/ibrahim-iqbal-dib59/",
        github: "https://github.com/dIB59"
    },
    { name: 'Ariel Shaka', role: 'Full-stack Developer',
        avatar: 'https://media.licdn.com/dms/image/D4D03AQHI_nDfF57s9w/profile-displayphoto-shrink_200_200/0/1674828495314?e=1707350400&v=beta&t=MFxdEpqEoY_lns_cgw1JhsbHT1pkxc94FOe23bkmidE',
        info: "Full-stack Java developer with a knack for developing innovative solutions. Enjoys collaboration across teams and focuses on proficiency and agility in creating high-quality products.",
        linkedin: "https://www.linkedin.com/in/arielshaka/",
        github: "https://github.com/ArielShaka"
    },
];

const DeveloperCard: React.FC<DeveloperCardProps> = ({ name, role, avatar, info,linkedin, github}) => (
    <Card elevation={3} style={{ height: '100%', borderRadius: '15px' }}>
        <Avatar src={avatar} alt={name} sx={{ width: 120, height: 120, margin: 'auto', marginTop: '2rem' }} />
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
    const router = useRouter();

    return (
        <>
            <AppBar className="nav-bar__user-page" position="static">
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} >
                        <EchoBoardLogo />
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button color="inherit" onClick={() => router.push('/')}>Home</Button>
                        <Button color="inherit" onClick={() => router.push('/chatroom')}>Chat</Button>
                    </Stack>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ marginTop: '2rem' }}>
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
        </>
    );
};

export default DeveloperPage;
