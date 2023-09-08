import React, {useState} from 'react'
import { PostEchoBoardData } from '../Types';
import { postEcho } from '../Functions';


const PostEchoBoard = () => {
    const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
        title: "",
        content: "", 
        author: "" //change it later when we have user authentication
      });
      const [errorMessage, setErrorMessage] = useState("");
    
    
      const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblemPost({ ...echoBoardPost, author: event.target.value });
      };
    
      const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setProblemPost({ ...echoBoardPost, title: event.target.value });
      };
    
      const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProblemPost({ ...echoBoardPost, content: event.target.value });
      };
    
      const problemPostToSend: PostEchoBoardData = {
        title: echoBoardPost.title,
        content: echoBoardPost.content, 
        author: echoBoardPost.author || "Anonymous" 
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
        value={echoBoardPost.author} 
        onChange={handleNameChange} /> 
        <input 
        placeholder="Title" 
        type="text" 
        value={echoBoardPost.title} 
        onChange={handleTitleChange} /> 
        <textarea 
        placeholder="Descride your problem" 
        cols={50}
        rows={5}
        value={echoBoardPost.content} 
        onChange={handleContentChange} /> 
        <input type="submit" />
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
   
    </div>
  )
}

export default PostEchoBoard