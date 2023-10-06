import { getStatusInfo } from '@/service/GetStatusInfo';
import { Box, Button, Chip, ChipProps, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popover, Popper } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
    status: string;
}


export const SolutionStatus: React.FC<SolutionStatusProps> = ({ status }) => {
    const [open, setOpen] = React.useState(false);

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
                    vertical: 'center',
                    horizontal: 'left',
                }}

            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Box sx={{ border: 1, p: 1, bgcolor: 'background.paper' }}>
                        The content of the Popper.
                        <Button> Yes</Button>
                    </Box>
                </ClickAwayListener>
            </Popover>
        </>
    )
}
