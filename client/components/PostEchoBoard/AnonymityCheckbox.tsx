import { Checkbox, FormControlLabel } from '@mui/material';
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
    <FormControlLabel
      control={
        <Checkbox
          onChange={handleIfAnonymousChange}
          name="Anonymous"
          checked={ifAnonymous}
          style={{ marginLeft: "10px" }}
        />
      }
      label="Post anonymously"
    />
  )
}
