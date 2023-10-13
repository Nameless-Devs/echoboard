import { SolutionResponseData } from '@/service/Types'
import React from 'react'

type SolutionItemProps = {
    solution: SolutionResponseData;
    onUpvote: () => void; 
}

export const SolutionItem: React.FC<SolutionItemProps> = ({ solution, onUpvote }) => {
    
  return (
    <div>SolutionItem</div>
  )
}
