import { Button, Chip, ChipProps } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
status: string;
}

type StatusInfo = {
    formattedStatus: string;
    color: string;
  }
  
  const getStatusInfo = (status: string): StatusInfo => {
    const statusMappings: Record<string, StatusInfo> = {
      SOLUTION_IN_REVIEW: { formattedStatus: "Solution in review", color: "info" },
      VOLUNTEERS_REQUIRED: { formattedStatus: "Volunteers required", color: "warning" },
      IMPLEMENTATION_IN_PROGRESS: { formattedStatus: "Implementation in progress", color: "secondary" },
      SOLVED: { formattedStatus: "Solved", color: "success" },
      FAILED: { formattedStatus: "Failed", color: "error" },
    };
  
    const defaultStatusInfo: StatusInfo = { formattedStatus: "Unknown", color: "default" };
  
    return statusMappings[status] || defaultStatusInfo;
  };

export const SolutionStatus: React.FC<SolutionStatusProps> = ({status}) => {
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
