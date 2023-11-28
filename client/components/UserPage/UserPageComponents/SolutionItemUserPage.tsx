import { EchoBoardPreviewResponseData, EchoBoardResponseData, SolutionResponseData, UserResponseData } from '@/service/Types';
import { Box, Grid, ListItem } from '@mui/material';
import React, { useState } from 'react';
import { SolutionStatusBadge } from '@/components/CommentModal/commentModalComponents/SolutionStatusBadge';
import { useQuery } from '@tanstack/react-query';
import { editSolution, fetchEchoBoardById, fetchEchoBoardBySolutionId } from '@/service/Functions';
import { EchoBoardPreviewDisplay } from './EchoBoardPreviewDisplay';
import CommentModal from '@/components/CommentModal/CommentModal';
import ExtraActionsMenu from './ExtraActionsMenu';
import { ClickableContentElement } from './ClickableContentElement';

type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: (solutionId: string) => void;
    user: UserResponseData;
}

export const SolutionItemUserPage: React.FC<SolutionItemProps> = ({ solution, onUpvote, user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const defaultTabIndex = 1;

    const {
        data: echoBoardPreview,
        isLoading: previewLoading,
        isError: previewError,
    } = useQuery<EchoBoardPreviewResponseData>(["echoBoards", solution.id], async () => {
        return await fetchEchoBoardBySolutionId(solution.id);
    });

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
                }}

            >
                <Box sx={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                    <Box sx={{ marginLeft: 'auto', width: '100%' }}>
                        <EchoBoardPreviewDisplay isLoading={previewLoading} data={echoBoardPreview} />
                    </Box>
                    <ExtraActionsMenu solution={solution} onEdit={editSolution} />
                </Box>
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", margin: "0.2rem 0.5rem 0 0 " }}>
                        <SolutionStatusBadge status={solution.status} solutionId={solution.id} />
                    </Box>
                </Grid>
                <ClickableContentElement
                    content={solution.content}
                    created={solution.created}
                    upvoteLength={solution.upvote.length}
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
