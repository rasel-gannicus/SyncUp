"use client" ;
import NotePad from '@/components/Notepad/Notepad';
import { LoadingSpinner } from '@/utils/Loading Spinner/LoadingSpinner';
import { useAuthState } from '@/utils/Route Protection/useAuthState';
import React from 'react';

const page = () => {
    const {user , loading} = useAuthState() ;
    if(loading){
        return <LoadingSpinner />
    }
    return (
        <div>
            <NotePad user={user} /> 
        </div>
    );
};

export default page;