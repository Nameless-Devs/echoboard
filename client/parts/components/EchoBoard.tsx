/* eslint-disable react/jsx-key */
import { EchoBoardResponseData, CommentResponseData } from "../Types";
import { fetchEchoBoards } from "../Functions";
import { SinglePost } from "./SinglePost";
import Link from "next/link";
import { Upvote } from "./Upvote";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const EchoBoard = () => {
  const {
    data: echoBoards,
    isLoading,
    isError,
  } = useQuery<EchoBoardResponseData[]>(["echoBoards"], fetchEchoBoards);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Echo Board All Posts</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error!</p>}
        {echoBoards?.map((echoBoard, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 345,
              minWidth: 345,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent
              sx={{
                flex: "1 1 auto",
              }}
            >
              <SinglePost {...echoBoard} />
            </CardContent>
            <CardActions>
              <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
              <Link href={`/${echoBoard.id}`}>
                <Button size="small">
                  Comments: {echoBoard.echoBoardComments.length}
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </div>
    </main>
  );
};
