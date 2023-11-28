import { SolutionResponseData } from '@/service/Types'
import React from 'react'
import { VolunteeringTabPendingSolution } from './VolunteeringTabSolutions';

type VolunteeringTabProps = {
  pendingVolunteeredSolutions: SolutionResponseData[];
  volunteeredSolutions: SolutionResponseData[];
}

export const VolunteeringTab: React.FC<VolunteeringTabProps> = ({
  pendingVolunteeredSolutions,
  volunteeredSolutions,
}) => {
  return (
    <>
      {pendingVolunteeredSolutions.map((solution, index) =>
        <VolunteeringTabPendingSolution key={index} solution={solution} type='pending' />
      )}

      {volunteeredSolutions.map((solution, index) =>
        <VolunteeringTabPendingSolution key={index} solution={solution} type='accepted' />
      )}
    </>
  )
}
