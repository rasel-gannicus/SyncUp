import Banner from '@/components/Home Page/Banner';
import HomePage from '@/components/Home Page/HomePage';
import { useState } from 'react';

export default function Home() {

  return (
    <div className="grid  items-center justify-items-center min-h-[60vh] pb-20  ">
      <Banner />
      <HomePage /> 
    </div>
  );
}
