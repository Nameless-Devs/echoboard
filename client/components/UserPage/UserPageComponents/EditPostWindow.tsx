import { editEchoBoard } from '@/service/Functions';
import { EchoBoardResponseData } from '@/service/Types';
import { Box, Button, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react'

type EditPostWindowProps = {
    open: boolean;
    handleClose: () => void;
    echoBoard: EchoBoardResponseData;
}
export const EditPostWindow: React.FC<EditPostWindowProps> = ({ open, handleClose, echoBoard }) => {
    const [formData, setFormData] = useState<EchoBoardResponseData>(echoBoard);
    const [hasPostChanged, setHasPostChanged] = useState(false);
   
    const queryClient = useQueryClient();
    const mutation = useMutation((data: EchoBoardResponseData) => 
    editEchoBoard(echoBoard.id, data)
    ); 
    

    const handleFieldChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
        setHasPostChanged(true);
    };

    const handleFormSubmit = () => {
    
        mutation.mutate(formData, {
            onSuccess: () => {
              queryClient.invalidateQueries(["userInfo"]);
              queryClient.refetchQueries(["userInfo"]);
              handleClose();
            },
            onError: (error) => {
              console.error("Error:", error);
            },
          });
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box sx={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   transform: 'translate(-50%, -50%)',
                   width: {xs: "90%", md: "60%"},
                   height: {xs: "50%", md: "60%"},
                   bgcolor: 'background.paper',
                   border: '2px solid #000',
                   boxShadow: 24,
                   p: 4,
            }}>
                <form 
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    marginTop: "2rem"
                    }}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={formData.title}
                        onChange={(e) => handleFieldChange('title', e.target.value)}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={8}
                        value={formData.content}
                        onChange={(e) => handleFieldChange('content', e.target.value)}
                    />
                    <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => handleFormSubmit()}
                    disabled={!hasPostChanged}
                    sx={{
                        maxWidth: "60%",
                        margin: "1.5rem auto 0"
                    }}
                    >
                        Save Changes
                    </Button>
                </form>
            </Box>
        </Modal>


    )
}
