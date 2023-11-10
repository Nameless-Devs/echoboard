import { Dialog, DialogContentText, ButtonGroup, Button, ButtonProps, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import { VolunteeringModal } from './VolunteeringModal';
import { useMutation } from '@tanstack/react-query';
import { volunteerForSolution } from '@/service/Functions';
import { getStatusInfo } from '@/service/GetStatusInfo';

type SolutionStatusProps = {
    status: string;
    solutionId: string
}

const options = [
    ["SOLUTION_IN_REVIEW", "Solution in review", "info"],
    ["VOLUNTEERS_REQUIRED", "Volunteers required", "warning"],
    ["IMPLEMENTATION_IN_PROGRESS", "Implementation in progress", "secondary"],
    ["SOLVED", "Solved", "success"],
    ["FAILED", "Failed", "error"]
];

export const SolutionStatusBadge: React.FC<SolutionStatusProps> = ({ status, solutionId })=> {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isClickble, setIsClickble] = useState(status == "VOLUNTEERS_REQUIRED");
    const [formatedStatus, setFormatedStatus] = useState(getStatusInfo(status));
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    

    const volunteerMutation = useMutation(
        (solutionId: string) => volunteerForSolution(solutionId)
    );


    const handleVolunteeringConfirm = () => {
        volunteerMutation.mutate(solutionId, {
            onSuccess: () => {
                setIsSuccess(true);
                setTimeout(() => setIsSuccess(false), 3500);
            }
        });
    }

    const handleClick = () => {
        if (formatedStatus.formattedStatus == "Volunteers required") {
            setIsConfirmationModalOpen(true);
        }

    };

  return (
    <>
    {isSuccess && (
                <Dialog open={isSuccess}>
                    <DialogContentText style={{ padding: "40px", color: "green", fontSize: "20px", textAlign: "center" }}>
                        You request was send and is now waiting for confirmation for post owner
                    </DialogContentText>
                </Dialog>
            )}
                <Button
                    size='small'
                    variant='contained'
                    color={formatedStatus.color as ButtonProps['color']}
                    onClick={handleClick}
                    style={{
                        borderTopLeftRadius: "30px",
                        borderBottomLeftRadius: "30px",
                        pointerEvents: isClickble ? "auto" : "none",
                        // position: "absolute",
                        // top: "0",
                        // right: "0",
                        // margin: "10px 15px 0 0",
                        height: "25px",
                        borderRadius: "30px",
                    }}
                
                >
                    {formatedStatus.formattedStatus}
                </Button>
            <VolunteeringModal
                isOpen={isConfirmationModalOpen}
                onConfirm={handleVolunteeringConfirm}
                onClose={() => setIsConfirmationModalOpen(false)}
            />
    </>
  )
}
