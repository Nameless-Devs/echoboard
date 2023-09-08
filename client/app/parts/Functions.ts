import { PostEchoBoardData, EchoBoardResponseData } from "./Types";

export async function postEcho(problemPostToSend: PostEchoBoardData) {
    try {
      const response = await fetch("http://localhost:8080/api/echoes", {
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
      const response = await fetch('http://localhost:8080/api/echoes');
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
        const response = await fetch(`http://localhost:8080/api/echoes/${echoBoardId}/upvote`, {
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

