import React, {useState} from 'react'
import { ProblemPostData } from '../Types';
import { postEcho } from '../Functions';


const PostEchoBoard = () => {
    const [problemPost, setProblemPost] = useState<ProblemPostData>({
        title: "",
        content: "", 
        author: "" //change it later when we have user authentication
      });
      const [errorMessage, setErrorMessage] = useState("");
    
    
      const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblemPost({ ...problemPost, author: event.target.value });
      };
    
      const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblemPost({ ...problemPost, title: event.target.value });
      };
    
      const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProblemPost({ ...problemPost, content: event.target.value });
      };
    
      const problemPostToSend: ProblemPostData = {
        title: problemPost.title,
        content: problemPost.content, 
        author: problemPost.author || "Anonymous" 
      }
    
      const handleProblemPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    

        try {
          const response = await postEcho(problemPostToSend);
          setProblemPost({
            title: "",
            content: "",
            author: "",
          });
          setErrorMessage("");
        } catch (error) {
          console.error("Error: " + error);
          setErrorMessage("Error: Your post could not be sent.");

        }
      }

  return (
    <div>
        <h2>Create post with your problem</h2>
        <form className="submitProblem__form" onSubmit={handleProblemPost}>
      <input 
        placeholder="Enter your name" 
        type="text" 
        value={problemPost.author} 
        onChange={handleNameChange} /> 
        <input 
        placeholder="Title" 
        type="text" 
        value={problemPost.title} 
        onChange={handleTitleChange} /> 
        <textarea 
        placeholder="Descride your problem" 
        cols={50}
        rows={5}
        value={problemPost.content} 
        onChange={handleContentChange} /> 
        <input type="submit" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
   
    </div>
  )
}

export default PostEchoBoard