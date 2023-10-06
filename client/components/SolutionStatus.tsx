import { Button } from '@mui/material'
import React from 'react'

type SolutionStatusProps = {
status: string;
}

export const SolutionStatus: React.FC<SolutionStatusProps> = ({status}) => {
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
                {status}
            </Button>
        </>
    )
}
