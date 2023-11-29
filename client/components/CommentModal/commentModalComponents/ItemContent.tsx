import UpvoteButton from '@/components/UpvoteButton'
import { Grid, Typography } from '@mui/material'
import React from 'react'

type ItemContentProps = {
    content: string; 
    upvote: number; 
    onUpvote: (itemId: string) => void; 
    id: string;
}

export const ItemContent: React.FC<ItemContentProps> = ({
    content,
    upvote,
    onUpvote,
    id
}) => {
    return (
        <>
            <Grid item xs={2} md={1}></Grid>
            <Grid item xs={10} md={11}>
                <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                    {content}
                </Typography>
            </Grid>
            <Grid item xs={2} md={1}></Grid>
            <Grid item xs={2} md={1}>
                <UpvoteButton count={upvote} onUpvote={() => onUpvote(id)} />
            </Grid>
        </>
    )
}
