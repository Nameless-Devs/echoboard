import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DeleteConfirmationWindow from './DeleteConfirmationWindow';
import { EchoBoardResponseData } from '@/service/Types';
import { EditPostWindow } from './EditPostWindow';
import { Box } from '@mui/material';
import MenuButton from './MenuButton';

type ExtraActionsMenuProps = {
  echoBoard: EchoBoardResponseData;
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
      <EditPostWindow open={isEditWindowOpen} handleClose={handleCloseEditWindow} echoBoard={echoBoard} />
      <DeleteConfirmationWindow open={isDeleteWindowOpen} handleClose={handleCloseDeleteWindow}  echoBoard={echoBoard}/> 
    </Box>
  );
}
