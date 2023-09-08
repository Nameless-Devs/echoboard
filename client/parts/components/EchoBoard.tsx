import React, { useEffect, useState } from 'react'
import { EchoBoardResponseData, CommentResponseData } from '../Types'
import { fetchEchoBoards } from '../Functions';
import { SinglePost } from './SinglePost';
import Link from 'next/link';

export const EchoBoard = () => {
    const [echoBoards, setEchoBoards] = useState<EchoBoardResponseData[]>([]);
    useEffect(() => {
        fetchEchoBoards()
        .then(data => setEchoBoards(data))
        .catch(error => console.error('Error fetching data', error));
    }, []);


  return (
    <div>EchoBoard All Posts
        {echoBoards.map((echoBoard, index) => (
          <Link href={`/${echoBoard.id}`} >
            <div key={index}>
            <SinglePost 
            id={echoBoard.id} 
            title={echoBoard.title} 
            content={echoBoard.content} 
            author={echoBoard.author} 
            upvote={echoBoard.upvote} 
            created={echoBoard.created} 
            comments={echoBoard.comments}  
            />  
            </div>  
          </Link>
        ))}
    </div>
  )
}
