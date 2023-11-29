import { SolutionStatusButton } from '@/components/CommentModal/commentModalComponents/SolutionStatusButton';
import { EchoBoardResponseData, UserResponseData } from '@/service/Types';
import { Box, Button, Grid, List, ListItem, Modal } from '@mui/material'
import React from 'react'
import { VolunteersInfo } from './VolunteersInfo';
import { ItemHeader } from '@/components/CommentModal/commentModalComponents/ItemHeader';
import { ItemContent } from '@/components/CommentModal/commentModalComponents/ItemContent';

type ManageSolutionsWindowProps = {
    open: boolean;
    onClose: () => void;
    user: UserResponseData;
    echoBoard: EchoBoardResponseData;
}

export const ManageSolutionsWindow: React.FC<ManageSolutionsWindowProps> = ({
    open,
    onClose,
    user,
    echoBoard
}) => {

    const onUpvote = () => {}

    return (
        <Modal open={open} onClose={onClose} >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: { xs: "90%", md: "60%" },
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                display: "flex",
                flexDirection: "column",
                maxHeight: "80vh",
                overflowY: "auto",
            }}>
                <List>
                    {echoBoard.echoBoardSolutions
                        .sort((a, b) => b.upvote.length - a.upvote.length)
                        .map((solution, index) => (
                            <ListItem key={index} className="comment-display__individual-comment">
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.5rem 1rem 0 0 " }}>
                                            <SolutionStatusButton status={solution.status} solutionId={solution.id} />
                                        </Box>
                                    </Grid>
                                    <ItemHeader 
                                    pictureUrl={solution.echoBoardUser.picture} 
                                    userName={solution.echoBoardUser.name}
                                    created={solution.created}
                                    /> 
                                    <ItemContent
                                    content={solution.content}
                                    upvote={solution.upvote.length}
                                    onUpvote={onUpvote}
                                    id={solution.id}
                                     />
                                    <VolunteersInfo solution={solution} /> 
                                </Grid>
                            </ListItem>
                        ))}
                </List>
                <Button variant="outlined" onClick={onClose} sx={{ maxWidth: "6rem", margin: "1rem auto 0" }}>Close</Button>
            </Box>
        </Modal>
    )
}
