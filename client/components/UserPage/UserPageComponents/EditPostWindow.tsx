import { EchoBoardResponseData } from '@/service/Types';
import { Box, TextField } from '@mui/material'
import Modal from '@mui/material/Modal';
import React, { useState } from 'react'

type EditPostWindowProps = {
    open: boolean;
    onClose: () => void;
    echoBoard: EchoBoardResponseData;
}
export const EditPostWindow: React.FC<EditPostWindowProps> = ({open, onClose, echoBoard}) => {
    const [formData, setFormData] = useState({
        title: echoBoard.title,
        content: echoBoard.content,
      });

  return (
    <Modal
    open={open}
    onClose={onClose}
     >
        <Box>
            <form>


            </form>
        </Box>
     </Modal>
    

  )
}
