import {
  PostEchoBoardData,
  EchoBoardResponseData,
  CommentToPost,
  SolutionToPost,
} from "./Types";

const baseURL = "http://localhost:8080/api"; //development

// const baseURL = "https://echoboard-app.fly.dev/api" //deployment

export async function postEcho(
  problemPostToSend: PostEchoBoardData,
  token: string
) {
  try {
    const response = await fetch(baseURL + "/echoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(problemPostToSend),
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

export async function fetchEchoBoards(
  token: string
): Promise<EchoBoardResponseData[]> {
  try {
    const response = await fetch(baseURL + "/echoes", {
      headers: {
        Authorization: "Bearer " + token,
      },
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

export async function upvotePost(echoBoardId: string, token: string) {
  try {
    const response = await fetch(baseURL + `/echoes/${echoBoardId}/upvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
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

export async function upvoteComment(
  echoBoardId: string,
  commentId: string,
  token: string
) {
  try {
    const response = await fetch(
      `${baseURL}/echoes/${echoBoardId}/comments/${commentId}/upvote`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

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

export async function fetchEchoBoardById(echoBoardId: string, token: string) {
  try {
    const response = await fetch(baseURL + `/echoes/${echoBoardId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
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
  echoBoardId: string,
  token: string
) {
  try {
    const response = await fetch(
      baseURL + "/echoes/" + echoBoardId + "/comments",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(commentToPost),
      }
    );

    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function postSolution(
  solutionToPost: SolutionToPost,
  echoBoardId: string,
  token: string
) {
  try {
    const response = await fetch(
      baseURL + "/echoes/" + echoBoardId + "/solutions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(solutionToPost),
      }
    );

    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}
export async function upvoteSolution(
  echoBoardId: string,
  solutionId: string,
  token: string
) {
  try {
    const response = await fetch(
      `${baseURL}/echoes/${echoBoardId}/solutions/${solutionId}/upvote`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

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
