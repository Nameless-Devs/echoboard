'use client'
import { fetchEchoBoardById } from '@/parts/Functions';
import { EchoBoardResponseData } from '@/parts/Types';
import { SinglePost } from '@/parts/components/SinglePost';
import React, { useEffect, useState } from 'react'

type Props = {
    params: {
      echoId: string;
    };
  };
export default function EchoBoardSingleView(props: Props){
    const [echoBoardPost, setEchoBoardPost] = useState<EchoBoardResponseData | null >(null);
    useEffect(() => {
        fetchEchoBoardById(props.params.echoId)
        .then(data => {
            if(data){
                setEchoBoardPost(data)
            }
        })
        .catch(error => console.error('Error fetching data', error));
    }, [props.params.echoId]);
    
    if (!echoBoardPost) {
        return <p>Loading...</p>;
    }

  return (
    <div>page
        <p>id of this echo is {props.params.echoId}</p>
        <SinglePost 
        id={echoBoardPost.id} 
        title={echoBoardPost.title} 
        content={echoBoardPost.content} 
        author={echoBoardPost.author} 
        upvote={echoBoardPost.upvote} 
        created={echoBoardPost.created} 
        comments={echoBoardPost.comments} />
    </div>
  )
}


// {
//     id: "",
//     title: "",
//     content: "",
//     author: "",
//     upvote: 0,
//     created: "",
//     comments: []
//     }