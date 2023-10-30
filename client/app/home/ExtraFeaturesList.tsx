import React from 'react'
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import { Box, Typography } from '@mui/material';

type ExtraFeatureProps = {  
  icon: React.ReactElement;
  text: string; 
}

const ExtraFeature: React.FC<ExtraFeatureProps> = ({ icon, text }) => (
    <Box sx={{ display: 'flex', flexDirection: "column", alignItems: 'center' }}>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
  

export const ExtraFeaturesList = () => {
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
      <ExtraFeature icon={<DesignServicesIcon />} text="Clean design" />
      <ExtraFeature icon={<LockIcon />} text="Google Authentication" />
      <ExtraFeature icon={<PeopleIcon />} text="Community" />
    </Box>
  )
}
