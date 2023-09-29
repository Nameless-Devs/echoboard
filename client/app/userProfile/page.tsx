"use client"
import { getUserInfo } from '@/parts/Functions';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'

export default function UserProfile () {

    const { data: user, error, isLoading } = useQuery(['userInfo'], getUserInfo);
    console.log(user);



    if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error!</div>;
      }
    
      return (
        <div>
          <h1>User Information</h1>
          <p>ID: {user?.id}</p>
          <p>Name: {user?.name}</p>
          <p>Email: {user?.email}</p>
        </div>
      );

  
    };
    
    
    
    
