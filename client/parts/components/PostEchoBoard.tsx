import React, {useState} from 'react'
import { PostEchoBoardData } from '../Types';
import { postEcho } from '../Functions';
import { useMutation } from '@tanstack/react-query';
import { title } from 'process';

const PostEchoBoard = () => {
    const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
        title: "",
        content: "", 
        author: "" //change it later when we have user authentication
      });

      const mutation = useMutation(postEcho);


      const handleProblemPost = (event) => {
        event.preventDefault();
        mutation.mutate(echoBoardPost, {
            onSuccess: () => {
                setProblemPost({
                    title: '',
                    content: '',
                    author: ''
                });
            },
            onError: (error) => {
                console.error("Error:", error);
            }
        });
    };

  return (
    <div>
      <h2>Create post with your problem</h2>
        <form onSubmit={handleProblemPost}>
         <input 
            placeholder="Enter your name" 
            name='author'
            type="text" 
            value={echoBoardPost.author}
            onChange={(e) => setProblemPost({...echoBoardPost, author: e.target.value})}
            /> 
            <input 
            placeholder="Title" 
            type="text" 
            value={echoBoardPost.title}
            onChange={(e) => setProblemPost({...echoBoardPost, title: e.target.value})}
            /> 
            <textarea 
            placeholder="Descride your problem" 
            cols={50}
            rows={5}
            name='content'
            value={echoBoardPost.content}
            onChange={(e) => setProblemPost({...echoBoardPost, content: e.target.value})}
            /> 
        <input type="submit" />
      </form>
      {/* {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
   
    </div>
  )
}

export default PostEchoBoard