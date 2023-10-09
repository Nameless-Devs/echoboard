import { getStatusInfo } from '@/service/GetStatusInfo';
import { Box, Button, Chip, ChipProps, ClickAwayListener, Popover } from '@mui/material'
import React, { useState } from 'react'

type SolutionStatusProps = {
    status: string;
    solutionId: string
}


export const SolutionStatus: React.FC<SolutionStatusProps> = ({ status, solutionId }) => {
    const [open, setOpen] = useState(false);
    
    const anchorRef = React.useRef<HTMLDivElement>(null);

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
    const statusInfo = getStatusInfo(status);
    const chipColor: ChipProps['color'] = statusInfo.color as ChipProps['color'];

    const handleStatusChange = (status: string ) => {
      var updatedStatus = ""; 
      if(status="SOLUTION_IN_REVIEW"){
        updatedStatus = "VOLUNTEERS_REQUIRED";
       
      }
      else if(status="VOLUNTEERS_REQUIRED"){
        updatedStatus = "IMPLEMENTATION_IN_PROGRESS";
       
      }


    }
    

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
            <Popover
                open={open}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                  }}

            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper', maxWidth: "300px", paddingTop: "30px", textAlign: "center" }}>
                        Would you like to accept test this solution and open it for testing? 
                      <Button style={{display: "block", margin: "10px auto 0"}}> Yes</Button>
                    </Box>
                </ClickAwayListener>
            </Popover>
        </>
    )
}
