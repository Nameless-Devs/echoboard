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
    <Box 
    sx={{ 
      display: 'flex', 
      flexDirection: "column", 
      alignItems: 'center',
      margin: {xs: '1.5rem', md: '5rem'},
      textAlign: 'center',
      }}>
      {React.cloneElement(icon, { sx: { ...iconSx } })}
      <Typography 
      variant='h4'
      sx={{
        fontSize: {xs: '1.5rem', md: '2.3rem'},
        mt: '0.5rem'
      }}
      >{text}</Typography>
    </Box>
  );
  
const iconSx = { fontSize: { xs: '4rem', md: '5.5rem' } };

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
      <ExtraFeature icon={<DesignServicesIcon color='primary' />} text="Clean design" />
      <ExtraFeature icon={<LockIcon color='primary' />} text="Google Authentication" />
      <ExtraFeature icon={<PeopleIcon color='primary'/>} text="Community" />
    </Box>
  )
}
