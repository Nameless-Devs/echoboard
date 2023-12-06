import * as React from "react";
import { useState } from "react";
import DeleteConfirmationWindow from "./DeleteConfirmationWindow";
import {
  CommentOrSolutionType,
  CommentResponseData,
  EchoBoardResponseData,
  SolutionResponseData,
} from "@/service/Types";
import { EditPostWindow } from "./EditPostWindow";
import { Box } from "@mui/material";
import MenuButton from "./MenuButton";
import { EditCommentOrSolutionWindow } from "./EditCommentOrSolutionWindow";
import {
  deleteComment,
  deleteEchoBoard,
  deleteSolution,
} from "@/service/Functions";

type ExtraActionsMenuProps = {
  echoBoard?: EchoBoardResponseData;
  comment?: CommentResponseData;
  solution?: SolutionResponseData;
  onEdit?: (id: string, data: CommentOrSolutionType) => Promise<Response>;
};

export default function ExtraActionsMenu({
  echoBoard,
  comment,
  solution,
  onEdit,
}: ExtraActionsMenuProps) {
  const [isDeleteWindowOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditWindowOpen, setIsEditWindowOpen] = useState(false);

  const handleEdit = () => {
    setIsEditWindowOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteWindow = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseEditWindow = () => {
    setIsEditWindowOpen(false);
  };

  const handleDeletePost = async (id: string) => {
    return deleteEchoBoard(id);
  };

  const handleDeleteSolution = async (id: string) => {
    return deleteSolution(id);
  };

  const handleDeleteComment = async (id: string) => {
    return deleteComment(id);
  };

  return (
    <Box>
      <MenuButton onEdit={handleEdit} onDelete={handleDelete} />
      {echoBoard && (
        <EditPostWindow
          open={isEditWindowOpen}
          handleClose={handleCloseEditWindow}
          echoBoard={echoBoard}
        />
      )}

      {comment && onEdit && (
        <EditCommentOrSolutionWindow
          open={isEditWindowOpen}
          handleClose={handleCloseEditWindow}
          content={comment.content}
          id={comment.id}
          onEdit={onEdit}
        />
      )}

      {solution && onEdit && (
        <EditCommentOrSolutionWindow
          open={isEditWindowOpen}
          handleClose={handleCloseEditWindow}
          content={solution.content}
          id={solution.id}
          onEdit={onEdit}
        />
      )}

      {echoBoard && (
        <DeleteConfirmationWindow
          open={isDeleteWindowOpen}
          handleClose={handleCloseDeleteWindow}
          contentType="post"
          content={echoBoard.title}
          id={echoBoard.id}
          handleDelete={handleDeletePost}
        />
      )}

      {solution && (
        <DeleteConfirmationWindow
          open={isDeleteWindowOpen}
          handleClose={handleCloseDeleteWindow}
          contentType="solution"
          content={solution.content}
          id={solution.id}
          handleDelete={handleDeleteSolution}
        />
      )}

      {comment && (
        <DeleteConfirmationWindow
          open={isDeleteWindowOpen}
          handleClose={handleCloseDeleteWindow}
          contentType="comment"
          content={comment.content}
          id={comment.id}
          handleDelete={handleDeleteComment}
        />
      )}
    </Box>
  );
}
