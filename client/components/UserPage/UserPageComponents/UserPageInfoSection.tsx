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
                gap: {xs: "1rem", md: "2rem"},
                marginTop: "2rem",
            }}
        >
            <Avatar
                alt={user.name + "avatar"}
                src={user.picture}
                sx={{
                    width: {xs: "7rem", md: "10rem"},
                    height: {xs: "7rem", md: "10rem"},
                    marginLeft: {xs: "1rem", md: ""},
                }}
            />
            <Box sx={{ alignSelf: "center" }}>
                <Typography 
                variant="h3" 
                color="textPrimary"
                sx={{
                    fontSize: {xs: "2rem", md: "3rem"}
                }}
                >
                    {user.name}
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: {xs: "space-around" , md: "center"},
                        gap: { xs: "0.5rem", md: "1rem"},
                        mr: { xs: "1rem", md: "0"}
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
