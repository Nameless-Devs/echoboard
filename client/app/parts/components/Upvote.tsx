import React from 'react'

export const Upvote = (upvote: number) => {
    const increaseUpvoteNumber = async () => {

    }

  return (
    <div>
        <button onClick={increaseUpvoteNumber}>upvotes:{upvote}</button>
    </div>
  )
}
