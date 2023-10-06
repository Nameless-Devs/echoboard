import { Button, Chip } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
status: string;
}

export const SolutionStatus: React.FC<SolutionStatusProps> = ({status}) => {
    const handleClick = () => {

    }
    return (
        <>
            <Chip
                color="info" //that should be different for different statuses
                disabled={false} //that should be false for the OP and true for everyone esle
                size="small"
                variant="filled"
                onClick={handleClick}
                label={status}
                style={{
                    position: "absolute",
                    top: "0", right: "0",
                    marginRight: "10px",
                    marginTop: "5px"
                }} />
        </>
    )
}
