import { SolutionResponseData } from '@/service/Types'
import React from 'react'
import { VolunteeringTabPendingSolution } from './VolunteeringTabPendingSolution';

type VolunteeringTabProps = {
    pendingVolunteeredSolutions: SolutionResponseData[];
    volunteeredSolutions: SolutionResponseData[];
}

export const VolunteringTab: React.FC<VolunteeringTabProps> = ({
    pendingVolunteeredSolutions, 
    volunteeredSolutions,
}) => {
  return (
    <>
    {pendingVolunteeredSolutions.map((solution, index) => 
    <VolunteeringTabPendingSolution key={index} solution={solution}/>
    )
  }
    </>
  )
}
