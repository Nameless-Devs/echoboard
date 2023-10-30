import React from 'react'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Typography } from '@mui/material';

export const ExtraFeatures = () => {
  return (
    <Box
    sx={{
        display: "flex",
        flexDirection: {xs: "column", md: "row"},
        padding: "3rem",
        justifyContent: "center", 
        alignItems: "center"
    }}
    >
        <Box>
            <DesignServicesIcon />
            <Typography>Clean design</Typography>
        </Box>
        <Box>
            <LockIcon /> 
            <Typography>Google Authentication</Typography>
        </Box>
        <Box>
            <PeopleIcon />
            <Typography>Community</Typography>
        </Box>
    </Box>
  )
}
