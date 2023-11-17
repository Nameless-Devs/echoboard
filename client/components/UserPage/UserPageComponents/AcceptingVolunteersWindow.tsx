import { UserResponseData } from '@/service/Types';
import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import { VolunteerToAccept } from './VolunteerToAccept';
import { VolunteerAccepted } from './VolunteerAccepted';

type AcceptingVolunteersWindowProps = {
    open: boolean;
    onClose: () => void;
    pendingVolunteers: UserResponseData[];
    volunteers: UserResponseData[];
}

export const AcceptingVolunteersWindow: React.FC<AcceptingVolunteersWindowProps> = ({
    open,
    onClose,
    volunteers,
    pendingVolunteers,
}) => {

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
                    maxHeight: "80vh"
                }}
            >
                <Typography variant='h6'>Pending volunteers:</Typography>
                {pendingVolunteers && Array.isArray(pendingVolunteers) && pendingVolunteers.length === 0 ? (
                    <Typography textAlign={'center'}>You have no pending volunteers</Typography>
                ) : (
                    pendingVolunteers.map((volunteer, index) =>
                        <VolunteerToAccept key={index} volunteer={volunteer} />
                    )
                )}
                <Typography variant='h6'>Accepted volunteers:</Typography>
                {volunteers && Array.isArray(volunteers) && volunteers.length === 0 ? (
                    <Typography textAlign={'center'}>You have no accepted volunteers</Typography>
                ) : (
                    volunteers.map((volunteer, index) =>
                        <VolunteerAccepted key={index} volunteer={volunteer} />
                    )
                )}
            </Box>
        </Modal>
    )
}
