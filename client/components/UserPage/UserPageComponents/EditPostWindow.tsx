import { Box } from '@mui/material'
import Modal from '@mui/material/Modal';
import React from 'react'

type EditPostWindowProps = {
    open: boolean;
    onClose: () => void;
}
export const EditPostWindow: React.FC<EditPostWindowProps> = ({open, onClose}) => {
  return (
    <Modal
    open={open}
    onClose={onClose}
     >
        <Box>
            
        </Box>
     </Modal>
    

  )
}
