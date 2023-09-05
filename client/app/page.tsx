"use client";

import React, { useState, useEffect } from "react";
export default function Home() {
  const [data, setData] = useState("")
  useEffect(() => {
    fetch('http://localhost:8080/api/status')
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.text(); // Parse the response as plain text
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
    </main>
  )
}
