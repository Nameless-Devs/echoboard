import { getStatusInfo } from '@/service/GetStatusInfo';
import { Button, Chip, ChipProps } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
    status: string;
}


export const SolutionStatus: React.FC<SolutionStatusProps> = ({ status }) => {
    const handleClick = () => {

    }
    const statusInfo = getStatusInfo(status);
    const chipColor: ChipProps['color'] = statusInfo.color as ChipProps['color'];

    return (
        <>
            <Chip
                color={chipColor}
                disabled={false} //that should be false for the OP and true for everyone esle
                size="small"
                variant="filled"
                onClick={handleClick}
                label={statusInfo.formattedStatus}
                style={{
                    position: "absolute",
                    top: "0", right: "0",
                    marginRight: "10px",
                    marginTop: "5px"
                }} />
        </>
    )
}
