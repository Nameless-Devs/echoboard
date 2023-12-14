import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import React, { useState } from 'react'
import { SinglePost } from '../SinglePost/SinglePost';
import { Upvote } from '../Upvote';
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { PostComment } from '../PostComment/PostComment';
import { PostCommentConditionVisibility } from '../PostComment/PostCommentConditionVisibility';

type EchoBoardCardPros = {
  echoBoard: EchoBoardResponseData;
  user: UserResponseData;
  handleOpen: (echoBoard: EchoBoardResponseData) => void;
  handleOpenSolutionForm: (echoBoard: EchoBoardResponseData) => void;
  index: number;
  handleOpenCommentsTab: () => void;
  handleOpenSolutionsTab: () => void;
}

const EchoBoardCard: React.FC<EchoBoardCardPros> = ({
  echoBoard,
  user,
  handleOpen,
  handleOpenSolutionForm,
  index,
  handleOpenCommentsTab,
  handleOpenSolutionsTab,
}) => {

  const [isFormVisible, setIsFormVisible] = useState(false);

  // const handleCommentButtonClick = () => {
  //   setIsFormVisible(true);
  // }

  return (
    <Card key={index} className="echo-board-card">
      <CardContent className="echo-board-card-content">
        <SinglePost echoBoard={echoBoard} user={user} />
      </CardContent>
      <CardActions className="echo-board-card-actions">
        <Upvote upvote={echoBoard.upvote} echoBoardId={echoBoard.id} />
        <Button size="small" onClick={() => {
          handleOpen(echoBoard);
          handleOpenCommentsTab();;
        }}>
          <ModeCommentIcon /> {echoBoard.echoBoardComments.length}
        </Button>
        <Button size="small" onClick={() => {
          handleOpen(echoBoard);
          handleOpenSolutionsTab()
        }}>
          <LightbulbIcon /> {echoBoard.echoBoardSolutions.length}
        </Button>
      </CardActions>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <PostComment echoBoardId={echoBoard.id} user={user} />
        <Button
          size="medium"
          onClick={() => handleOpenSolutionForm(echoBoard)}
          className="echo-board-solution-btn"
        >
          Suggest solution
        </Button>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PostCommentConditionVisibility echoBoardId={echoBoard.id} user={user} isFormVisible={isFormVisible} />
        <Box sx={{ display: 'flex', flexDirection: "row" }}>
        {!isFormVisible && <Button className="leave-a-comment-button" onClick={() => setIsFormVisible(true)}>
          Leave a comment
        </Button>}
        <Button
          size="medium"
          onClick={() => handleOpenSolutionForm(echoBoard)}
          className="echo-board-solution-btn"
        >
          Suggest solution
        </Button>
      </Box>
      </Box>
      
    </Card>
  )
}

export default EchoBoardCard