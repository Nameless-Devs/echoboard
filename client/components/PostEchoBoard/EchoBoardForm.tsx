import { PostEchoBoardData, UserResponseData } from '@/service/Types'
import React from 'react'

type EchoBoardFormProps = {
  echoBoardPost: PostEchoBoardData;
  setProblemPost: (post: PostEchoBoardData) => void; 
  ifAnonymous: boolean; 
  setIfAnonymous: (anonymous: boolean) => void;
  handleProblemPost: (event?: React.FormEvent<HTMLFormElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  user: UserResponseData;
}

export const EchoBoardForm: React.FC<EchoBoardFormProps> = ({
    echoBoardPost,
    setProblemPost,
    ifAnonymous,
    setIfAnonymous,
    handleProblemPost,
    handleKeyPress,
    user,
  }
) => {
  return (
    <div>EchoBoardFrom</div>
  )
}
