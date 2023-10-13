import { EchoBoardResponseData, UserResponseData } from '@/service/Types'
import React from 'react'

type EchoBoardCardPros = {
echoBoard: EchoBoardResponseData;
user: UserResponseData;
handleOpen: (echoBoard: EchoBoardResponseData) => void; 
handleOpenSolutionForm: (echoBoard: EchoBoardResponseData) => void; 
index: number;
}

const EchoBoardCard: React.FC<EchoBoardCardPros> = ({ 
    echoBoard, 
    user, 
    handleOpen, 
    handleOpenSolutionForm, 
    index 
}) => {
  return (
    <div>EchoBoardCard</div>
  )
}

export default EchoBoardCard