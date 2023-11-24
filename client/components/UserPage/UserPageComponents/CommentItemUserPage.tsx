import { editComment, fetchEchoBoardByCommentId, fetchEchoBoardById } from "@/service/Functions"
import { CommentResponseData, EchoBoardPreviewResponseData, EchoBoardResponseData, UserResponseData } from "@/service/Types"
import { ListItem, Box, Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { EchoBoardPreviewDisplay } from "./EchoBoardPreviewDisplay"
import ExtraActionsMenu from "./ExtraActionsMenu"
import { useState } from "react"
import { ClickableContentElement } from "./ClickableContentElement"
import CommentModal from "@/components/CommentModal/CommentModal"

type CommentItemProps = {
    comment: CommentResponseData;
    user: UserResponseData;
}

export const CommentItemUserPage: React.FC<CommentItemProps> = ({ comment, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultTabIndex = 0;

    const { data: echoBoardPreview, isLoading: previewLoading, isError } = useQuery<EchoBoardPreviewResponseData>(
        ["echoBoards", comment.id],
        async () => {
            return await fetchEchoBoardByCommentId(comment.id);
        }
    );

    const {
        data: echoBoardExtended,
        isLoading: extendedLoading,
        isError: extendedError,
    } = useQuery<EchoBoardResponseData>(
        ["echoBoards", echoBoardPreview?.id],
        async () => {
            return await fetchEchoBoardById(echoBoardPreview?.id || '');
        },
        {
            enabled: !!echoBoardPreview?.id,
        }
    );

    const handleClose = () => {
        setIsOpen(false);
    };


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
                <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Box sx={{ marginLeft: 'auto', width: '100%' }}>
                        <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
                    </Box>
                    <ExtraActionsMenu comment={comment} onEdit={editComment} />
                </Box>
                <ClickableContentElement
                    content={comment.content}
                    created={comment.created}
                    upvoteLength={comment.upvote.length}
                    setIsOpen={setIsOpen} />
            </Grid>
            {echoBoardExtended && <CommentModal
                post={echoBoardExtended}
                handleClose={handleClose}
                isOpen={isOpen}
                user={user}
                defaultTabIndex={defaultTabIndex}
            />}
        </ListItem>
    )
}