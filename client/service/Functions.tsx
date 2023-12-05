import { formatEndpoint } from "@/utils/apiUtils";
import { ENDPOINTS } from "./config";
import {
  PostEchoBoardData,
  EchoBoardResponseData,
  CommentToPost,
  SolutionToPost,
  UserResponseData,
  Message,
  EchoBoardPreviewResponseData,
  SolutionVolunteersResponseData,
  CommentOrSolutionType,
  ChatRoomResponse,
} from "./Types";

export async function postEcho(problemPostToSend: PostEchoBoardData) {
  try {
    const response = await fetch(ENDPOINTS.ECHOBOARD_POST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problemPostToSend),
      credentials: "include",
    });

    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchEchoBoards(): Promise<EchoBoardResponseData[]> {
  try {
    const response = await fetch(ENDPOINTS.ECHOBOARD_POST, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardResponseData[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function upvotePost(echoBoardId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD_UPVOTE, {
      echoBoardId,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function upvoteComment(echoBoardId: string, commentId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.COMMENT_UPVOTE, {
      echoBoardId,
      commentId,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      console.log(response);
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchEchoBoardById(echoBoardId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD, { echoBoardId });

    const response = await fetch(endpoint, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function postComment(
  commentToPost: CommentToPost,
  echoBoardId: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.COMMENT_POST, { echoBoardId });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToPost),
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function postingCommentOnComment(
  commentToPost: CommentToPost,
  commentId: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.COMMENT_POST_COMMENT, {
      commentId,
    });
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToPost),
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
  }
}

export async function postSolution(
  solutionToPost: SolutionToPost,
  echoBoardId: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_POST, { echoBoardId });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solutionToPost),
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function upvoteSolution(echoBoardId: string, solutionId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_UPVOTE, {
      echoBoardId,
      solutionId,
    });
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function getUserInfo() {
  try {
    const response = await fetch(ENDPOINTS.USER, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data: UserResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function getUserChatRooms(): Promise<ChatRoomResponse[]> {
  try {
    const response = await fetch(ENDPOINTS.USER_CHATROOMS, {
      credentials: "include",
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function changeSolutionStatus(solutionId: string, status: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_UPDATE_STATUS, {
      solutionId,
      status,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function volunteerForSolution(solutionId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_VOLUNTEER, {
      solutionId,
    });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(solutionToPost),
      credentials: "include",
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchChatRoomHistory(
  chatRoomId: number
): Promise<Message[]> {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.CHAT_HISTORY, {
      chatRoomId: chatRoomId.toString(),
    });
    const response = await fetch(endpoint, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: Message[] = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function deleteEchoBoard(echoBoardId: string): Promise<void> {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD_DELETE, {
      echoBoardId,
    });
    const response = await fetch(endpoint, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log("Echo board deleted successfully");
    } else {
      console.error("Failed to delete echo board");
    }
  } catch (error) {
    console.error("An error occurred while deleting the echo board:", error);
  }
}

export async function editEchoBoard(
  echoBoardId: string,
  echoBoard: EchoBoardResponseData
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD_EDIT, { echoBoardId });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(echoBoard),
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function getAllPendingVolunteers(solutionId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_VOLUNTEER, {
      solutionId,
    });

    const response = await fetch(endpoint, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: SolutionVolunteersResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}
// Made by mistake, maybe will be useful in future?
// export async function fetchSolutionById(solutionId: string) {
//   try {
//     const endpoint = formatEndpoint(ENDPOINTS.SOLUTION, { solutionId });

//     const response = await fetch(endpoint, {
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP Error! Status: ${response.status}`);
//     }
//     const data: SolutionResponseData = await response.json();
//     return data;
//   } catch (error) {
//     throw new Error("Error fetching data: " + error);
//   }
// }

export async function fetchEchoBoardBySolutionId(solutionId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD_BY_SOLUTION, {
      solutionId,
    });

    const response = await fetch(endpoint, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardPreviewResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function fetchEchoBoardByCommentId(commentId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.ECHOBOARD_BY_COMMENT, {
      commentId,
    });

    const response = await fetch(endpoint, {
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardPreviewResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function acceptPendingVolunteer(
  solutionId: string,
  volunteerId: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_VOLUNTEER, {
      solutionId,
    });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: volunteerId,
      credentials: "include",
    });

    if (response.ok) {
      const data: SolutionVolunteersResponseData = await response.json();
      return data;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function denyPendingVolunteer(
  solutionId: string,
  volunteerId: string
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_VOLUNTEER, {
      solutionId,
    });
    const response = await fetch(endpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: volunteerId,
      credentials: "include",
    });

    if (response.status === 204) {
      console.log("Deleted from pending volunteer list successfully");
    } else {
      console.error("Failed to delete volunteer");
    }
  } catch (error) {
    console.error("An error occurred while deleting volunteer:", error);
  }
}

export async function editSolution(
  solutionId: string,
  solution: CommentOrSolutionType
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION_EDIT, { solutionId });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solution),
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function deleteSolution(solutionId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.SOLUTION, { solutionId });
    const response = await fetch(endpoint, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log("Solution deleted successfully");
    } else {
      console.error("Failed to delete solution with id " + solutionId);
    }
  } catch (error) {
    console.error("An error occurred while deleting the solution:", error);
  }
}

export async function editComment(
  commentId: string,
  comment: CommentOrSolutionType
) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.COMMENT, { commentId });

    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
      credentials: "include",
    });

    if (response.ok) {
      return response;
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function deleteComment(commentId: string) {
  try {
    const endpoint = formatEndpoint(ENDPOINTS.COMMENT, { commentId });
    const response = await fetch(endpoint, {
      credentials: "include",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log("Comment deleted successfully");
    } else {
      console.error("Failed to delete comment with id " + commentId);
    }
  } catch (error) {
    console.error("An error occurred while deleting the comment:", error);
  }
}
