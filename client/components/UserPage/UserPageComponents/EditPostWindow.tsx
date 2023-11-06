import { EchoBoardResponseData } from '@/service/Types';
import { Box, Button, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import React, { useState } from 'react'

type EditPostWindowProps = {
    open: boolean;
    handleClose: () => void;
    echoBoard: EchoBoardResponseData;
}
export const EditPostWindow: React.FC<EditPostWindowProps> = ({ open, handleClose, echoBoard }) => {
    const [formData, setFormData] = useState({
        title: echoBoard.title,
        content: echoBoard.content,
    });

    const handleFieldChange = (field: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleFormSubmit = {
        
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box>
                <form>
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
                        rows={4}
                        value={formData.content}
                        onChange={(e) => handleFieldChange('content', e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={() => handleFormSubmit}>
                        Save Changes
                    </Button>


                </form>
            </Box>
        </Modal>


    )
}
