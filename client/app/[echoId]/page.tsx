"use client";
import { fetchEchoBoardById } from "@/components/Functions";
import { EchoBoardResponseData } from "@/components/Types";
import { SinglePost } from "@/components/SinglePost";
import { Upvote } from "@/components/Upvote";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    echoId: string;
  };
};
export default function EchoBoardSingleView(props: Props) {
  const [echoBoardPost, setEchoBoardPost] =
    useState<EchoBoardResponseData | null>(null);
  useEffect(() => {
    fetchEchoBoardById(props.params.echoId)
      .then((data) => {
        if (data) {
          setEchoBoardPost(data);
        }
      })
      .catch((error) => console.error("Error fetching data", error));
  }, [props.params.echoId]);

  if (!echoBoardPost) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <SinglePost
        id={echoBoardPost.id}
        title={echoBoardPost.title}
        content={echoBoardPost.content}
        author={echoBoardPost.author}
        upvote={echoBoardPost.upvote}
        created={echoBoardPost.created}
        echoBoardComments={echoBoardPost.echoBoardComments}
      />
      <Upvote upvote={echoBoardPost.upvote} echoBoardId={echoBoardPost.id} />
      {echoBoardPost.echoBoardComments.map((comment, index) => (
        <div key={index}>
          <p>{comment.author}</p>
          <p>{comment.comment}</p>
          <p>upvotes:{comment.upvote}</p>
        </div>
      ))}
    </div>
  );
}
