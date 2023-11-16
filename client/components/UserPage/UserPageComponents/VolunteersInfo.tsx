import { SolutionResponseData } from '@/service/Types'
import { Box, Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { AcceptingVolunteersWindow } from './AcceptingVolunteersWindow';

type VolunteerInfoProps = {
    solution: SolutionResponseData;
}


export const VolunteersInfo: React.FC<VolunteerInfoProps> = ({ solution }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
        <Grid item xs={8} md={10}>
            {solution.status === "VOLUNTEERS_REQUIRED" && (
                <Box
                    sx={{
                        display: { xs: "block", md: "flex" },
                        alignItems: "center",
                        justifyContent: "flex-end",
                        marginRight: { xs: "1rem", md: "2rem" },
                        marginBottom: { xs: "0.5rem", md: "0" },
                        color: "#1976d2",
                        gap: "1rem",
                        textAlign: "right",
                    }}>
                    <Typography>
                        Volunteers: 5, Accepted: 2
                    </Typography>
                    <Button variant="outlined" onClick={handleOpen}>MANAGE</Button>
                </Box>
            )}
        </Grid>
        <AcceptingVolunteersWindow open={isOpen} onClose={handleClose} solutionId={solution.id} />
        </>
    )
}
