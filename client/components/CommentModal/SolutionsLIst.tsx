import { SolutionResponseData } from '@/service/Types';
import React from 'react'

type SolutionsListProps =  {
    solutions: SolutionResponseData[];
    onSolutionUpvote: (solutionId: string) => void;
  }

export const SolutionsList: React.FC<SolutionsListProps> = ({ solutions, onSolutionUpvote }) => {
  return (
    <div>SolutionsLIst</div>
  )
}
