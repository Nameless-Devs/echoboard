"use client";

import React, { useState, useEffect } from "react";
import PostEchoBoard from "../parts/components/PostEchoBoard";
import { EchoBoard } from "../parts/components/EchoBoard";


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
  /* Connection testing ends here*/
  
  return (
    <main>
      <PostEchoBoard />
      <EchoBoard />
    </main>
  )
}
