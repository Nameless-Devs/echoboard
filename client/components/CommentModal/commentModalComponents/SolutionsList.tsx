import { SolutionResponseData } from '@/service/Types';
import { List } from '@mui/material';
import React from 'react'
import { SolutionItem } from './SolutionItem';


type SolutionsListProps =  {
    solutions: SolutionResponseData[];
    onSolutionUpvote: (solutionId: string) => void;
  }

export const SolutionsList: React.FC<SolutionsListProps> = ({ solutions, onSolutionUpvote }) => {
  return (
    <List>
    {solutions
      .sort((a, b) => b.upvote.length - a.upvote.length)
      .map((solution, index) => (
        <SolutionItem
          key={index}
          solution={solution}
          onUpvote={() => onSolutionUpvote(solution.id)}
        />
      ))}
  </List>
  )
}
