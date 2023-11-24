import { timeConverter } from '@/service/TimeConverter'
import { Box, Grid, Typography, Button } from '@mui/material'
import React from 'react'

export const ClickableContentElement = () => {
  return (
    <Box sx={{
        width: '100%',
        cursor: 'pointer',
        borderRadius: '0.5rem',
        transition: 'box-shadow 0.3s',
        padding: "0 0.5rem",
        '&:hover': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
        },
    }}
        onClick={() => setIsOpen(true)} >
        <Grid item xs={12} >
            <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                {solution.content}
            </Typography>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: "-0.4rem" }}>
            <Typography variant="caption" color="textSecondary">
                {timeConverter(solution.created)}
            </Typography>
        </Grid>
        <Grid item xs={12}>
            <Button sx={{
                padding: 0,
                minWidth: 0,
                margin: "0.5rem 0 1rem 0",
                '&:hover': { backgroundColor: 'transparent' },
            }}>
                <ThumbUpIcon /> {solution.upvote.length}
            </Button >
        </Grid>
    </Box>
  )
}
