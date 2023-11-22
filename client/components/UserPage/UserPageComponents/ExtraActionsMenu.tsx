import * as React from 'react';
import { useState } from 'react';
import DeleteConfirmationWindow from './DeleteConfirmationWindow';
import { CommentResponseData, EchoBoardResponseData, SolutionResponseData } from '@/service/Types';
import { EditPostWindow } from './EditPostWindow';
import { Box } from '@mui/material';
import MenuButton from './MenuButton';

type ExtraActionsMenuProps = {
  echoBoard?: EchoBoardResponseData;
  comment?: CommentResponseData; 
  solution?: SolutionResponseData;
}

export default function ExtraActionsMenu( {echoBoard}: ExtraActionsMenuProps) {
  const [ isDeleteWindowOpen, setIsDeleteModalOpen ] = useState(false);
  const [ isEditWindowOpen, setIsEditWindowOpen] = useState(false);

  const handleEdit = () => {
    setIsEditWindowOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };
 
  const handleCloseDeleteWindow = () => {
   setIsDeleteModalOpen(false);
  };

  const handleCloseEditWindow = () => {
    setIsEditWindowOpen(false);
  };

  return (
    <Box>
      <MenuButton onEdit={handleEdit} onDelete={handleDelete} />
      {echoBoard && <EditPostWindow open={isEditWindowOpen} handleClose={handleCloseEditWindow} echoBoard={echoBoard} />}
      {echoBoard && <DeleteConfirmationWindow open={isDeleteWindowOpen} handleClose={handleCloseDeleteWindow}  echoBoard={echoBoard}/> }
    </Box>
  );
}
