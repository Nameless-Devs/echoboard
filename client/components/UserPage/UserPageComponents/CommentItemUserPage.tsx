import UpvoteButton from "@/components/UpvoteButton"
import { useUpvote } from "@/hooks/useUpvote"
import { fetchEchoBoardByCommentId } from "@/service/Functions"
import { timeConverter } from "@/service/TimeConverter"
import { CommentResponseData, EchoBoardPreviewResponseData } from "@/service/Types"
import { ListItem, Avatar, Typography, Box, Grid, Skeleton } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

type CommentItemProps = {
    comment: CommentResponseData,
}

export const CommentItemUserPage: React.FC<CommentItemProps> = ({ comment }) => {
    
    const { data: echoBoardPreview, isLoading, isError } = useQuery<EchoBoardPreviewResponseData>(
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
                <Grid item xs={12} md='auto'>
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={200} height={24} />
                    ) : (
                        echoBoardPreview && (
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                            }}>
                                <Typography color="textSecondary">to:</Typography>
                                <Avatar
                                    src={echoBoardPreview.echoBoardUser.picture}
                                    alt={echoBoardPreview.echoBoardUser.name + " avatar picture"}
                                    sx={{ margin: "0 0.5rem", width: 24, height: 24 }}
                                />
                                <Typography color="textSecondary" sx={{ mr: "0.5rem" }}>
                                    {echoBoardPreview.echoBoardUser.name}&rsquo;s problem
                                </Typography>
                            </Box>
                        )
                    )
                    }
                </Grid>
                <Grid item xs={12} md='auto' >
                    {isLoading ? (
                        <Skeleton variant="rectangular" width={150} height={24}/>
                    ) : (
                        echoBoardPreview && <Typography color="textSecondary">&quot;{echoBoardPreview.title}&quot;</Typography>
                    )}
                </Grid>
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