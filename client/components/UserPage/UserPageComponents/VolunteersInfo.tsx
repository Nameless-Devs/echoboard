import { SolutionResponseData, SolutionVolunteersResponseData } from '@/service/Types'
import { Box, Button, Grid, Typography, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AcceptingVolunteersWindow } from './AcceptingVolunteersWindow';
import { useQuery } from '@tanstack/react-query';
import { getAllPendingVolunteers } from '@/service/Functions';


type VolunteerInfoProps = {
    solution: SolutionResponseData;
}

export const VolunteersInfo: React.FC<VolunteerInfoProps> = ({ solution }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const handleOpen = () => {
        setIsOpen(true);
    };
    const handleClose = () => {
        setIsOpen(false);
    };

    const { data: solutionVolunteers, isLoading, isError } = useQuery<SolutionVolunteersResponseData>(
        ["echoBoards", solution.id],
        async () => {
            return await getAllPendingVolunteers(solution.id);
        }
    );


    useEffect(() => {
        if (solutionVolunteers) {
            setIsDisabled(solutionVolunteers.pendingVolunteers === null || solutionVolunteers.pendingVolunteers?.length === 0
                && solutionVolunteers.volunteers?.length === 0);
        }
    }, [solutionVolunteers]);

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
                        {solutionVolunteers ? (
                            <Typography>
                                Pending volunteers: {solutionVolunteers.pendingVolunteers ? solutionVolunteers.pendingVolunteers?.length : 0},
                                Accepted volunteers: {solutionVolunteers.volunteers ? solutionVolunteers.volunteers.length : 0}
                            </Typography>
                ) : (
                <Skeleton variant="rectangular" width={210} height={30} />
                        )}
                <Button disabled={isDisabled} variant="outlined" onClick={handleOpen}>MANAGE</Button>
            </Box>
                )}
        </Grid >
            { solutionVolunteers &&
            <AcceptingVolunteersWindow
                open={isOpen}
                onClose={handleClose}
                pendingVolunteers={solutionVolunteers.pendingVolunteers}
                volunteers={solutionVolunteers.volunteers}
                solutionId={solution.id}
            />
}
        </>
    )
}
