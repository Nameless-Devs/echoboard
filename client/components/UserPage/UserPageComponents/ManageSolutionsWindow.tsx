import { SolutionStatusButton } from '@/components/CommentModal/commentModalComponents/SolutionStatusButton';
import UpvoteButton from '@/components/UpvoteButton';
import { timeConverter } from '@/service/TimeConverter';
import { EchoBoardResponseData, UserResponseData } from '@/service/Types';
import { Avatar, Box, Button, Grid, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import React from 'react'
import { TypePredicateKind } from 'typescript';

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
    // const convertedTime = timeConverter(echoBoard.echoBoardSolutions.);
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
                                        <Box sx={{display: "flex", justifyContent: "flex-end", margin: "0.5rem 1rem 0 0 "}}>
                                        <SolutionStatusButton status={solution.status} solutionId={solution.id} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2} md={1}>
                                        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}> 
                                        <Avatar src={solution.echoBoardUser.picture}/>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={10} md={11}>
                                            <Typography sx={{marginBottom: "-0.4rem"}}>
                                                {solution.echoBoardUser.name}
                                            </Typography>
                                            <Typography variant="caption" color="textSecondary">
                                               {timeConverter(solution.created)}
                                            </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={1}></Grid>
                                    <Grid item xs={10} md={11}>
                                        <Typography variant="body1" color="textPrimary" sx={{margin: "0.5rem 2rem 0.5rem 0"}}>
                                            {solution.content}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2} md={1}></Grid>
                                    <Grid item xs={2} md={1}>
                                    <UpvoteButton count={solution.upvote.length} onUpvote={() => { }} />
                                    </Grid>
                                    <Grid item xs={8} md={10}> 
                                    {solution.status === "VOLUNTEERS_REQUIRED" && (
                                    <Box>
                                        <Typography>Volunteers: 5, Accepted: 2</Typography>
                                        <Button>MANAGE</Button>
                                    </Box>
                                )}</Grid>

                                </Grid>

                                {/* <Avatar src={solution.echoBoardUser.picture} style={{ marginRight: "15px" }} />
                                <ListItemText
                                    primary={
                                        <div>
                                            <Typography variant="body2" color="textSecondary">
                                                {solution.echoBoardUser.name}
                                            </Typography>
                                        </div>
                                    }
                                    secondary={
                                        <Typography variant="body1" color="textPrimary">
                                            {solution.content}
                                        </Typography>
                                    }
                                ></ListItemText>
                                <SolutionStatusButton status={solution.status} solutionId={solution.id} />
                                <UpvoteButton count={solution.upvote.length} onUpvote={() => { }} />
                                {solution.status === "VOLUNTEERS_REQUIRED" && (
                                    <Box>
                                        <Typography>Volunteers: 5, Accepted: 2</Typography>
                                        <Button>MANAGE</Button>
                                    </Box>
                                )} */}
                            </ListItem>
                        ))}
                </List>
                <Button variant="outlined" onClick={onClose} sx={{ maxWidth: "6rem", margin: "1rem auto 0" }}>Close</Button>
            </Box>
        </Modal>
    )
}
