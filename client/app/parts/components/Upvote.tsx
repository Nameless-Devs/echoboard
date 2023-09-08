import React, { useState } from 'react'
import { upvotePost } from '../Functions';
import { UpvoteProps } from '../Types';

export const Upvote: React.FC<UpvoteProps> = ({ upvote, echoBoardId })  => {
    const [currentUpvote, setCurrentUpvote] = useState(upvote);

    const increaseUpvoteNumber = async () => {
        const response = await upvotePost(echoBoardId);
        if (response.ok) {
            setCurrentUpvote(currentUpvote + 1);
          } else {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
    }
  return (
    <div>
        <button onClick={increaseUpvoteNumber}>upvotes:{currentUpvote}</button>
    </div>
  )
}
