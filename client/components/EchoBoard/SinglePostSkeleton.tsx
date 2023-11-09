import { Box, Skeleton } from '@mui/material'
import React from 'react'

export const SinglePostSkeleton = () => {
    return (
        <Box sx={{padding: "7rem 1rem 9rem"}} >
            <Box sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                marginBottom: "10px",
            }}>
                <Skeleton
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40} />
                <Box>
                    <Skeleton
                        animation="wave"
                        height={15}
                        width={180}
                        style={{ marginBottom: 6 }} />
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="40%"
                        style={{ marginBottom: 6 }} />
                </Box>
            </Box>
            <Skeleton
                animation="wave"
                height={25}
                style={{ marginBottom: "1rem", marginTop:  "2rem"}} />
            <Skeleton
                animation="wave"
                height={12}
            />
            <Skeleton
                animation="wave"
                height={12}
            />
            <Skeleton
                animation="wave"
                height={12}
            />
            <Skeleton
                animation="wave"
                height={12}
            />
            <Skeleton
                animation="wave"
                height={12}
            />
            <Skeleton
                animation="wave"
                height={30}
                width={150}
                sx={{marginTop: "2rem"}}
            />

        </Box>
    )
}
