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
    echoBoard: EchoBoardResponseData;
}

const DeleteConfirmationWindow: React.FC<DeleteConfirmationWindowProp> = ({
    open,
    handleClose,
    echoBoard,
}) => {
    
    const queryClient = useQueryClient();

    const deleteEchoBoardMutation = useMutation(deleteEchoBoard, {
        onSuccess: async () => {
          handleClose();
          queryClient.invalidateQueries(['userInfo']);
          queryClient.refetchQueries(['userInfo']);
        },
      });
    
      const handleDeletePost = async (echoBoard: EchoBoardResponseData) => {
        deleteEchoBoardMutation.mutate(echoBoard.id);
      };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Confirm
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this post?
                </Typography>
                <Typography variant='h5'>
                    {echoBoard.title}
                </Typography>
                <Typography>
                    You will not be able to reverse this process.
                </Typography>
                <Button onClick={() => {
                    handleDeletePost(echoBoard)
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