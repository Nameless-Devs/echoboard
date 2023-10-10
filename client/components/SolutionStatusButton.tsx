import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { getStatusInfo } from '@/service/GetStatusInfo';
import { useRef, useState } from 'react';

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

export const SolutionStatusButton: React.FC<SolutionStatusProps> = ({ status, solutionId }) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedStatus, setSelectedStatus] = useState(status);
    const [formatedStatus, setFormatedStatus] = useState(getStatusInfo(status));

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex][1]}`);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setOpen(false);
        setSelectedStatus(options[index][0]);
        setFormatedStatus(getStatusInfo(selectedStatus));
    };

    const handleToggle = () => {
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

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button
                    onClick={handleClick}// maybe delete it 
                    size='small'
                    color={formatedStatus.color as ButtonProps['color']}
                >
                    {formatedStatus.formattedStatus}
                </Button>
                <Button
                    size="small"
                    color={formatedStatus.color as ButtonProps['color']}
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                    disabled={false} //fix logic later
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option[0]}
                                            //   disabled={index === 2}
                                            selected={index === selectedIndex}
                                            value={option[0]}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option[1]}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
