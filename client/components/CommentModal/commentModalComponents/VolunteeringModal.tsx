import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React from 'react'

type VolunteeringModalProps = {
  isConfirmationModalOpen: boolean;
  setIsConfirmationModalOpen: (isOpen: boolean) => void;
 } 

export const VolunteeringModal: React.FC<VolunteeringModalProps> = ({
  isConfirmationModalOpen,
  setIsConfirmationModalOpen,
}) => {
  return (
    <Dialog open={isConfirmationModalOpen} onClose={() => setIsConfirmationModalOpen(false)}>
    <DialogTitle>Confirm Volunteer Action</DialogTitle>
    <DialogContent>
        <DialogContentText>
            Are you sure you want to volunteer for solution testing?
        </DialogContentText>
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setIsConfirmationModalOpen(false)}>Cancel</Button>
        <Button
            onClick={() => {
                setIsConfirmationModalOpen(false);
            }}
            color="primary"
        >
            Confirm
        </Button>
    </DialogActions>
</Dialog>
  )
}