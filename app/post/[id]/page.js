'use client'
import { db } from '@/app/shared/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function page() {

  const id = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    getPost();
  }, [])


  async function getPost() {
    const q = query(collection(db, 'posts'), where("id", "==", id.id));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setData(doc.data());
    })
  }


  return (
    <div className="contianer my-10 w-9/12 bg-slate-100 shadow-2xl p-5 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 my-5">{data.title}</h1>
      <div className="container my-5">
        <h1 className="text-sm text-gray-700 font-semibold">Date : {data.date}</h1>
        <h1 className="text-sm text-gray-700 font-semibold">Time : {data.time}</h1>
      </div>
      <div className="container items-center w-full gap-4 flex flex-row p-2">
        <img src={data.authorImg} alt="" className="w-8 h-8 rounded-full" />
        <Link href={'/'} className="container flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-gray-800">{data.author}</h2>
          <h2 className="text-sm font-semibold text-gray-800">{data.email}</h2>
        </Link>
      </div>
      <img src={data.image} alt="" className="w-full" />
      <p className="text-lg font-semibold mt-5 leading-10">{data.description}</p>
    </div>
  )
}
