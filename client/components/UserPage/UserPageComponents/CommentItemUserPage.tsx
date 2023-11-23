import UpvoteButton from "@/components/UpvoteButton"
import { useUpvote } from "@/hooks/useUpvote"
import { editComment, fetchEchoBoardByCommentId } from "@/service/Functions"
import { timeConverter } from "@/service/TimeConverter"
import { CommentResponseData, EchoBoardPreviewResponseData } from "@/service/Types"
import { ListItem, Avatar, Typography, Box, Grid, Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { EchoBoardPreviewDisplay } from "./EchoBoardPreviewDisplay"
import ExtraActionsMenu from "./ExtraActionsMenu"

type CommentItemProps = {
    comment: CommentResponseData,
}

export const CommentItemUserPage: React.FC<CommentItemProps> = ({ comment }) => {
    
    const { data: echoBoardPreview, isLoading: previewLoading, isError } = useQuery<EchoBoardPreviewResponseData>(
        ["echoBoards", comment.id],
        async () => {
            return await fetchEchoBoardByCommentId(comment.id);
        }
    );

    const upvoteMutation = useUpvote(echoBoardPreview ? echoBoardPreview.id : '');

    return (
        <ListItem sx={{ padding: 0 }}>
            <Grid
                container sx={{
                    border: "solid black 1px",
                    padding: "1rem",
                    margin: "1rem 0",
                    borderRadius: "1rem",
                    backgroundColor: "white",
                }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%'}}>
                    <Box sx={{ marginLeft: 'auto', width: '100%'}}> 
                    <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
                    </Box>
                    <ExtraActionsMenu comment={comment} onEdit={editComment} />
                </Box>
                <Grid item xs={12} >
                    <Typography variant="body1" color="textPrimary" sx={{ margin: "0.5rem 2rem 0.5rem 0" }}>
                        {comment.content}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{ marginTop: "-0.4rem" }}>
                    <Typography variant="caption" color="textSecondary">
                        {timeConverter(comment.created)}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <UpvoteButton count={comment.upvote.length} onUpvote={() => echoBoardPreview && upvoteMutation.mutate(comment.id)} />
                </Grid>
            </Grid>
        </ListItem>
    )
}