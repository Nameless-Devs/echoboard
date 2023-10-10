import { changeSolutionStatus } from '@/service/Functions';
import { getStatusInfo } from '@/service/GetStatusInfo';
import { Box, Button, Chip, ChipProps, ClickAwayListener, FormControl, InputLabel, MenuItem, Popover, Select } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'


type SolutionStatusProps = {
  status: string;
  solutionId: string;
};


export const SolutionStatus: React.FC<SolutionStatusProps> = ({ status, solutionId }) => {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const anchorRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        () => changeSolutionStatus(solutionId, selectedStatus),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['comments', solutionId]);
            },
        }
    );


    const handleStatusChange = (newStatus: string) => {
        setSelectedStatus(newStatus);
        setOpen(false);

        mutation.mutate();
    };



    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };
    const statusInfo = getStatusInfo(selectedStatus || status);
    const chipColor: ChipProps['color'] = statusInfo.color as ChipProps['color'];




    return (
        <>
            <div ref={anchorRef}>
            <ClickAwayListener onClickAway={handleClose}>
                <Chip
                    color={chipColor}
                    disabled={false} //that should be false for the OP and true for everyone esle
                    size="small"
                    variant="filled"
                    onClick={handleClick}
                    label={statusInfo.formattedStatus}
                    style={{
                        position: "relative",
                        marginTop: "-30px"
                    }}
                />
                </ClickAwayListener>
            </div> 
          
            <FormControl>
           
                <Select
                    open={open}
                    onClose={() => handleClose}
                    onOpen={handleClick}
                    value={selectedStatus}
                    onChange={(event) => handleStatusChange(event.target.value as string)}
                >
                    <MenuItem value="SOLUTION_IN_REVIEW">Solution in review</MenuItem>
                    <MenuItem value="VOLUNTEERS_REQUIRED">Volunteers required</MenuItem>
                    <MenuItem value="IMPLEMENTATION_IN_PROGRESS">Implementation in progress</MenuItem>
                    <MenuItem value="SOLVED">Solved</MenuItem>
                    <MenuItem value="FAILED">Failed</MenuItem>
                </Select>
                
            </FormControl>
    
        </>
    )
}
