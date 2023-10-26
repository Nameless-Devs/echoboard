"use client"
import Chat from '@/components/Chat/Chat';
import { getUserInfo } from '@/service/Functions';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

export default function UserChat() {
    const { data: user, error, isLoading } = useQuery(['userInfo'], getUserInfo)

    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error!</div>;
      }
    
      if (user) {
    return (
        <div>
            <Chat user={user}  />
        </div>
    )
}
}
