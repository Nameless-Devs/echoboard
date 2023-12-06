import { CommentOrSolutionType } from "@/service/Types";
import { Box, Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";

type EditCommentOrSolutionWindowProps = {
  open: boolean;
  handleClose: () => void;
  content: string;
  id: string;
  onEdit: (id: string, data: CommentOrSolutionType) => Promise<Response>;
};
export const EditCommentOrSolutionWindow: React.FC<
  EditCommentOrSolutionWindowProps
> = ({ open, handleClose, content, id, onEdit }) => {
  const [formData, setFormData] = useState(content);
  const [hasPostChanged, setHasPostChanged] = useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation((data: CommentOrSolutionType) =>
    onEdit(id, data)
  );

  const handleFieldChange = (value: string) => {
    setFormData(value);
    setHasPostChanged(true);
  };

  const handleFormSubmit = () => {
    const newData: CommentOrSolutionType = {
      id: id,
      content: formData,
    };

    mutation.mutate(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries(["userInfo"]);
        queryClient.refetchQueries(["userInfo"]);
        handleClose();
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", md: "60%" },
          height: { xs: "50%", md: "60%" },
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          <TextField
            label="Content"
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            value={formData}
            onChange={(e) => handleFieldChange(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleFormSubmit()}
            disabled={!hasPostChanged}
            sx={{
              maxWidth: "60%",
              margin: "1.5rem auto 0",
            }}
          >
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};
