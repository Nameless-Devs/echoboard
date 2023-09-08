import React, { useEffect, useState } from 'react'
import { EchoBoardResponseData, CommentResponseData } from '../Types'
import { fetchEchoBoards } from '../Functions';

export const EchoBoard = () => {
    const [echoBoards, setEchoBoards] = useState<EchoBoardResponseData[]>([]);
    useEffect(() => {
        fetchEchoBoards()
        .then(data => setEchoBoards(data))
        .catch(error => console.error('Error fetching data', error));
    }, []);


  return (
    <div>EchoBoard</div>
  )
}
