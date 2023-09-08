import React, { useEffect, useState } from 'react'
import { EchoBoardResponseData, CommentResponseData } from '../Types'
import { fetchEchoBoards } from '../Functions';

export const EchoBoard = () => {
    const [echoBoards, setEchoBoards] = useState<EchoBoardResponseData[]>([]);
    useEffect(() => {
    })

  return (
    <div>EchoBoard</div>
  )
}
