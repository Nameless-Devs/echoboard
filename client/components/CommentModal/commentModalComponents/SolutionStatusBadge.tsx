import {
  Dialog,
  DialogContentText,
  Button,
  ButtonProps,
} from "@mui/material";
import React, { useState } from "react";
import { VolunteeringModal } from "./VolunteeringModal";
import { useMutation } from "@tanstack/react-query";
import { volunteerForSolution } from "@/service/Functions";
import { getStatusInfo } from "@/service/GetStatusInfo";

type SolutionStatusProps = {
  status: string;
  solutionId: string;
};

const options = [
  ["SOLUTION_IN_REVIEW", "Solution in review", "info"],
  ["VOLUNTEERS_REQUIRED", "Volunteers required", "warning"],
  ["IMPLEMENTATION_IN_PROGRESS", "Implementation in progress", "secondary"],
  ["SOLVED", "Solved", "success"],
  ["FAILED", "Failed", "error"],
];

export const SolutionStatusBadge: React.FC<SolutionStatusProps> = ({
  status,
  solutionId,
}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const isClickable = status == "VOLUNTEERS_REQUIRED" ? true : false;
  const formateStatus = getStatusInfo(status);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const volunteerMutation = useMutation((solutionId: string) =>
    volunteerForSolution(solutionId)
  );

  const handleVolunteeringConfirm = () => {
    volunteerMutation.mutate(solutionId, {
      onSuccess: () => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3500);
      },
    });
  };

  const handleClick = () => {
    if (formateStatus.formattedStatus == "Volunteers required") {
      setIsConfirmationModalOpen(true);
    }
  };

  return (
    <>
      {isSuccess && (
        <Dialog open={isSuccess}>
          <DialogContentText
            style={{
              padding: "40px",
              color: "green",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            You request was send and is now waiting for confirmation for post
            owner
          </DialogContentText>
        </Dialog>
      )}
      <Button
        size="small"
        variant="contained"
        color={formateStatus.color as ButtonProps["color"]}
        onClick={handleClick}
        style={{
          borderTopLeftRadius: "30px",
          borderBottomLeftRadius: "30px",
          pointerEvents: isClickable ? "auto" : "none",
          height: "25px",
          borderRadius: "30px",
        }}
      >
        {formateStatus.formattedStatus}
      </Button>
      <VolunteeringModal
        isOpen={isConfirmationModalOpen}
        onConfirm={handleVolunteeringConfirm}
        onClose={() => setIsConfirmationModalOpen(false)}
      />
    </>
  );
};
