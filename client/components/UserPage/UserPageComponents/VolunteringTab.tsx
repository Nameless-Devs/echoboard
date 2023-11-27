import { SolutionResponseData } from '@/service/Types'
import React from 'react'

type VolunteeringTabProps = {
    pendingVolunteeredSolutions: SolutionResponseData[];
    volunteeredSolutions: SolutionResponseData[];
}

export const VolunteringTab: React.FC<VolunteeringTabProps> = ({
    pendingVolunteeredSolutions, 
    volunteeredSolutions,
}) => {
  return (
    <div>VolunteringTab</div>
  )
}
