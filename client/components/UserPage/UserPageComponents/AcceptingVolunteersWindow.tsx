import { getAllPendingVolunteers } from '@/service/Functions';
import { UserResponseData } from '@/service/Types';
import { Avatar, Box, Button, Modal, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { VolunteerToAccept } from './VolunteerToAccept';

type AcceptingVolunteersWindowProps = {
    open: boolean;
    onClose: () => void;
    solutionId: string;
}

export const AcceptingVolunteersWindow: React.FC<AcceptingVolunteersWindowProps> = ({
    open,
    onClose,
    solutionId
}) => {

    const { data: volunteers, isLoading, isError } = useQuery<UserResponseData[]>(
        ["echoBoards", solutionId],
        async () => {
            return await getAllPendingVolunteers(solutionId);
        }
    );

    return (
        <Modal open={open} onClose={onClose} >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: { xs: "90%", md: "60%" },
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography variant='h6'>Volunteers:</Typography> 
                {volunteers && volunteers.map((volunteer, index) =>
                 <VolunteerToAccept key={index} volunteer={volunteer} />
                )}
            </Box>
        </Modal>
    )
}
