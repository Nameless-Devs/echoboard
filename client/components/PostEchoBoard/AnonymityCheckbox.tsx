import React, { ChangeEvent } from 'react'

type AnonymityCheckboxProps = {
  ifAnonymous: boolean;
  handleIfAnonymousChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const AnonymityCheckbox: React.FC<AnonymityCheckboxProps> = ({
  ifAnonymous,
  handleIfAnonymousChange,
}) => {
  return (
    <div>AnonimityCheckbox</div>
  )
}
