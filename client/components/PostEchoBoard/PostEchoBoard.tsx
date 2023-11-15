import React, { ChangeEvent, useState } from "react";
import { PostEchoBoardData, UserResponseData } from "@/service/Types";
import { postEcho } from "@/service/Functions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EchoBoardForm } from "./EchoBoardForm";

const PostEchoBoard: React.FC<UserResponseData> = (user: UserResponseData) => {
  const [ifAnonymous, setIfAnonymous] = useState(false);
  const [echoBoardPost, setProblemPost] = useState<PostEchoBoardData>({
    title: "",
    content: "",
    author: user.name,
    anonymous: false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation((data: PostEchoBoardData) =>
    postEcho(data)
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setIfAnonymous(event.target.checked);
    setProblemPost((prevEchoBoardPost) => ({
      ...prevEchoBoardPost,
      anonymous: event.target.checked,
    }));
  }

  const handleProblemPost = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (!echoBoardPost.title.trim() || !echoBoardPost.content.trim()) {
      return;
    }

    mutation.mutate(echoBoardPost, {
      onSuccess: () => {
        queryClient.invalidateQueries(["echoBoards"]);
        setProblemPost({
          title: "",
          content: "",
          author: user.name,
          anonymous: false,
        });
        setIfAnonymous(false);
      },
      onError: (error) => {
        console.error("Error:", error);
      },
    });
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.shiftKey === false) {

      event.preventDefault();
      handleProblemPost();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "300px",
      }}
    >
      <EchoBoardForm
        echoBoardPost={echoBoardPost}
        setProblemPost={setProblemPost}
        ifAnonymous={ifAnonymous}
        handleProblemPost={handleProblemPost}
        handleKeyPress={handleKeyPress}
        user={user}
        handleIfAnonymousChange={handleChange}
      />
    </div>
  );
};

export default PostEchoBoard;
