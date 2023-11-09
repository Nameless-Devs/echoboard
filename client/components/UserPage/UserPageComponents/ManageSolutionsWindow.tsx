import { EchoBoardResponseData, UserResponseData } from '@/service/Types';
import { Box, Modal } from '@mui/material'
import React from 'react'

type ManageSolutionsWindowProps = {
    open: boolean; 
    onClose: () => void; 
    user: UserResponseData; 
    echoBoard: EchoBoardResponseData; 
}

export const ManageSolutionsWindow: React.FC<ManageSolutionsWindowProps> = ({
    open,
    onClose,
    user,
    echoBoard
}) => {
  return (
    <Modal open={open} onClose={onClose}>
        <Box> 
            
        </Box>
    </Modal>
  )
}
