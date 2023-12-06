import { StatusInfo } from "./Types";

export const getStatusInfo = (status: string): StatusInfo => {
  const statusMappings: Record<string, StatusInfo> = {
    SOLUTION_IN_REVIEW: {
      formattedStatus: "Solution in review",
      color: "info",
    },
    VOLUNTEERS_REQUIRED: {
      formattedStatus: "Volunteers required",
      color: "warning",
    },
    IMPLEMENTATION_IN_PROGRESS: {
      formattedStatus: "Implementation in progress",
      color: "secondary",
    },
    SOLVED: { formattedStatus: "Solved", color: "success" },
    FAILED: { formattedStatus: "Failed", color: "error" },
  };

  const defaultStatusInfo: StatusInfo = {
    formattedStatus: "Unknown",
    color: "default",
  };

  return statusMappings[status] || defaultStatusInfo;
};
