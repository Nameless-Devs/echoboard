import { changeSolutionStatus } from '@/service/Functions';
import { getStatusInfo } from '@/service/GetStatusInfo';
import { Box, Button, Chip, ChipProps, ClickAwayListener, Popover } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react'

type SolutionStatusProps = {
    status: string;
    solutionId: string
}


export const SolutionStatus: React.FC<SolutionStatusProps> = ({ status, solutionId }) => {
    const [open, setOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const anchorRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        () => changeSolutionStatus(solutionId, selectedStatus),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['status', solutionId]);
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
            </div>
        
        </>
    )
}
