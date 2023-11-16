import { SolutionResponseData } from '@/service/Types'
import { Box, Button, Grid, Typography, Skeleton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AcceptingVolunteersWindow } from './AcceptingVolunteersWindow';
import { useQuery } from '@tanstack/react-query';
import { getAllPendingVolunteers } from '@/service/Functions';
import { UserResponseData } from '@/service/Types';

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

    const { data: volunteers, isLoading, isError } = useQuery<UserResponseData[]>(
        ["echoBoards", solution.id],
        async () => {
            return await getAllPendingVolunteers(solution.id);
        }
    );


    useEffect(() => {
        if (volunteers) {
            setIsDisabled(volunteers === null || volunteers.length === 0);
        }
    }, [volunteers]);

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
                        {volunteers ? (
                            <Typography>
                                Volunteers: {volunteers.length}, Accepted: 0
                            </Typography>
                        ) : (
                            <Skeleton variant="rectangular" width={210} height={30} />
                        )}
                        <Button disabled={isDisabled} variant="outlined" onClick={handleOpen}>MANAGE</Button>
                    </Box>
                )}
            </Grid>
            {volunteers && <AcceptingVolunteersWindow open={isOpen} onClose={handleClose} volunteers={volunteers} />}
        </>
    )
}
