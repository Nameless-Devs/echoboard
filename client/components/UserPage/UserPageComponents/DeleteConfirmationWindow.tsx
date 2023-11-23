import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { EchoBoardResponseData } from '@/service/Types';
import { deleteEchoBoard } from '@/service/Functions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type DeleteConfirmationWindowProp = {
    open: boolean;
    handleClose: () => void;
    contentType: string;
    content: string;
    id: string;
    handleDelete: (id: string) => Promise<void>;
}

const DeleteConfirmationWindow: React.FC<DeleteConfirmationWindowProp> = ({
    open,
    handleClose,
    contentType,
    content,
    id,
    handleDelete,
}) => {

    const queryClient = useQueryClient();

    const handleDeleteAction = useMutation(handleDelete, {
        onSettled: () => {
            handleClose();
            queryClient.invalidateQueries(['userInfo']);
            queryClient.refetchQueries(['userInfo']);
        },
    });

    const handleDeletePost = async (id: string) => {
        handleDeleteAction.mutate(id);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="delete-comfirmation-modal"
            aria-describedby="delete-confirmation-description"
        >
            <Box sx={style}>
                <Typography id="delete-comfirmation-modal" variant="h6" component="h2">
                    Confirm
                </Typography>
                <Typography id="delete-confirmation-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this {contentType}?
                </Typography>
                <Typography variant='h5'>
                    {content}
                </Typography>
                <Typography>
                    You will not be able to reverse this process.
                </Typography>
                <Button onClick={() => {
                    handleDeletePost(id)
                }
                }>
                    Yes
                </Button>
                <Button onClick={handleClose}>No</Button>
            </Box>
        </Modal>
    )
}

export default DeleteConfirmationWindow