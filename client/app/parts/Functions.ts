import { ProblemPostData } from "./Types";

export async function postEcho(problemPostToSend: ProblemPostData) {
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