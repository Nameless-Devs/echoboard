import { Box, Modal } from '@mui/material'
import React from 'react'

type AcceptingVolunteersWindowProps = {
    open: boolean;
    onClose: () => void;
}

export const AcceptingVolunteersWindow: React.FC<AcceptingVolunteersWindowProps> = ({
    open,
    onClose
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
                }}
            >

            </Box>
        </Modal>
    )
}
