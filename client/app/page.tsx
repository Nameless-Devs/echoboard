"use client";

import React, { useState, useEffect } from "react";
import PostEchoBoard from "./components/PostEchoBoard";


export default function Home() {

  /*This is just to test the connection */
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
  /* Connection testing ends here*/
  
  return (
    <main>
      <p>Hello</p>
      <p>{data}</p>
      <PostEchoBoard />
    </main>
  )
}
