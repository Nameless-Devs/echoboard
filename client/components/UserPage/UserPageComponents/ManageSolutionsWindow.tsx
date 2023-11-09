import { SolutionItem } from '@/components/CommentModal/commentModalComponents/SolutionItem';
import { SolutionStatusButton } from '@/components/CommentModal/commentModalComponents/SolutionStatusButton';
import UpvoteButton from '@/components/UpvoteButton';
import { EchoBoardResponseData, UserResponseData } from '@/service/Types';
import { Avatar, Box, List, ListItem, ListItemText, Modal, Typography } from '@mui/material'
import React from 'react'

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
    return (
        <Modal open={open} onClose={onClose}>
            <Box>
                <List>
                    {echoBoard.echoBoardSolutions
                        .sort((a, b) => b.upvote.length - a.upvote.length)
                        .map((solution, index) => (
                            <ListItem key={index} className="comment-display__individual-comment">
                                <Avatar src={solution.echoBoardUser.picture} style={{ marginRight: "15px" }} />
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
                                <UpvoteButton count={solution.upvote.length} onUpvote={() => {}} />
                            </ListItem>
                        ))}
                </List>
            </Box>
        </Modal>
    )
}
