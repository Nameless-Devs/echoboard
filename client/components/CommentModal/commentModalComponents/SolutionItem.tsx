import { SolutionResponseData } from '@/service/Types'
import { Avatar, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'
import UpvoteButton from '../../UpvoteButton';
import { SolutionStatusButton } from '@/components/CommentModal/commentModalComponents/SolutionStatusButton';

type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
}

export const SolutionItem: React.FC<SolutionItemProps> = ({ solution, onUpvote }) => {

    return (
        <ListItem className="comment-display__individual-comment">
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
            <UpvoteButton count={solution.upvote.length} onUpvote={() => onUpvote(solution.id)} />
        </ListItem>
    )
}
