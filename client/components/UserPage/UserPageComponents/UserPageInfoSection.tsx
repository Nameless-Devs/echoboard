import { UserResponseData } from '@/service/Types'
import { Box, Avatar, Typography, Chip } from '@mui/material'
import React from 'react'

type UserPageInfoSectionProp = {
    user: UserResponseData;
}

export const UserPageInfoSection: React.FC<UserPageInfoSectionProp> = ({user}) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: "2rem",
                marginTop: "2rem",
            }}
        >
            <Avatar
                alt={user.name + "avatar"}
                src={user.picture}
                style={{
                    width: "150px",
                    height: "150px",
                }}
            />
            <Box sx={{ alignSelf: "center" }}>
                <Typography variant="h3" color="textPrimary">
                    {user.name}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                    }}
                >
                    <Chip
                        label={"Problems solved: " + user.name.length}
                        color="success"
                    />
                    <Chip label="Volunteered: 5" color="warning" />
                    {/* number of solved problems and volunteered are just placeholder for now,
                real funtionality will be implemented later on */}
                </Box>
            </Box>
        </Box>
    )
}
