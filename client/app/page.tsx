"use client";

import React, { useState, useEffect } from "react";
type ProblemPostData = {
  title: string;
  content: string;
  author: string;
};
export default function Home() {
  const [problemPost, setProblemPost] = useState<ProblemPostData>({
    title: "",
    content: "", 
    author: "Anonymous" //change it later when we have user authentication
  });

  const [isProblemSubmited, setProblemSubmited] = useState<boolean>(false);


  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblemPost({ ...problemPost, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProblemPost({ ...problemPost, content: event.target.value });
  };


  const [data, setData] = useState("")
  useEffect(() => {
    fetch('http://localhost:8080/api/status')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text(); 
      })
      .then(setData)
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);
console.log("this is data " + data);
  return (
    <main>
      <p>Hello</p>
      <p>{data}</p>
      <form>
        <input placeholder="Title" type="text" onChange={handleTitleChange} /> 
        <textarea placeholder="Descride your problem" onChange={handleContentChange} /> 
        <input type="submit" />
      </form>
    </main>
  )
}
