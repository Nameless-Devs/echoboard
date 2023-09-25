import { PostEchoBoardData, EchoBoardResponseData, CommentToPost } from "./Types";

const baseURL = "http://localhost:8080/api"; //change it when deploying

// const baseURL = "http://16.170.226.226:8080/api"

export async function postEcho(problemPostToSend: PostEchoBoardData) {
  try {
    const response = await fetch(baseURL + "/echoes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problemPostToSend),
    });

    if (response.ok) {
      console.log(response);
      //return response.json();
      //when i try to parse it, in gives me an eeror that it is not a json
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
}

export async function fetchEchoBoards(): Promise<EchoBoardResponseData[]> {
  try {
    const response = await fetch(baseURL + "/echoes");
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
    const response = await fetch(baseURL + `/echoes/${echoBoardId}/upvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
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

export async function upvoteComment(echoBoardId: string, commentId: string) {
  try {
    const response = await fetch(`${baseURL}/echoes/${echoBoardId}/comments/${commentId}/upvote`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      }
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
    const response = await fetch(baseURL + `/echoes/${echoBoardId}`);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    const data: EchoBoardResponseData = await response.json();
    return data;
  } catch (error) {
    throw new Error("Error fetching data: " + error);
  }
}

export async function postComment(commentToPost: CommentToPost, echoBoardId: string) {

  try {
    const response = await fetch(baseURL + "/echoes/" + echoBoardId + "/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentToPost),
    });

    if (response.ok) {
      console.log(response);
      //return response.json();
      //when i try to parse it, in gives me an eeror that it is not a json
    } else {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error("Fetch error: " + error);
  }
  
}
