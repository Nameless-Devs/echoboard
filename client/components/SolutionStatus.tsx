import { SolutionResponseData } from '@/service/Types'
import { Button } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
solution: SolutionResponseData;
}

export const SolutionStatus: React.FC<SolutionStatusProps> = ({solution}) => {
    return (
        <>
            <Button
                color="primary"
                disabled={false}
                size="small"
                variant="outlined"
                style={{
                    position: "absolute",
                    top: "0", right: "0",
                    marginRight: "10px"
                }}>
                {solution.status}
            </Button>
        </>
    )
}
