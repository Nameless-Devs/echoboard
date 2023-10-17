import { UserResponseData } from '@/service/Types'
import React from 'react'

type UserPageProps = {
    user: UserResponseData;
}
export const UserPage: React.FC<UserPageProps> = ({user}) => {
  return (
    <div>UserPage</div>
  )
}
