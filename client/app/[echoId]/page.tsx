import React from 'react'

type Props = {
    params: {
      echoId: string;
    };
  };
export default function EchoBoardSingleView(props: Props){
  return (
    <div>page
        <p>id of this echo is {props.params.echoId}</p>
    </div>
  )
}
