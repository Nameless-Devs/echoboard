import React, { useEffect, useState } from "react";
import { EchoBoardResponseData, CommentResponseData } from "../Types";
import { fetchEchoBoards } from "../Functions";
import { SinglePost } from "./SinglePost";
import Link from "next/link";
import { Upvote } from "./Upvote";
import { useQuery } from "@tanstack/react-query";

export const EchoBoard = () => {

  const {
    data: echoBoards,
    isLoading,
    isError,
  } = useQuery<EchoBoardResponseData[]>(["echoBoards"], fetchEchoBoards);

  return (
    <div>
      <h1>Echo Board All Posts</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error!</p>}
      {echoBoards?.map((echoBoard, index) => (
        <div key={index}>
          <Link href={`/${echoBoard.id}`}>
          <SinglePost {...echoBoard} />
          </Link>
          <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
        </div>
      ))}
    </div>
  );
};
