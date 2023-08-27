'use client'
import { db } from '@/app/shared/firebaseConfig';
import PostComponent from '@/components/PostComponent';
import { LoginContext } from '@/context/LoginContext';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function page() {

  const search = useParams();
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({});
  const [userFound, setUserFound] = useState(false);
  const {isLogedIn,setIsLogedIn} = useContext(LoginContext);
  const router = useRouter();
  

  useEffect(() => {
    getUsersPosts();
    getUserInfo(search.email.replace("%40", "@"));
  }, []);

  async function getUsersPosts() {
    const q = query(collection(db, 'posts'), where("email", "==", search.email.replace("%40", "@")));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setData(data => [...data, doc.data()]);
    })
  }

  const getUserInfo = async (email) => {

    const q = query(collection(db, 'users'), where("email", "==", search.email.replace("%40", "@")));

    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      if (doc) {
        setUserData(doc.data());
        setUserFound(true);
      }
      else {
        setUserFound(false);
      }
    })

  }

  return (
    <div className="cotnainer w-full flex  gap-4 flex-col items-center justify-center p-5">

      {
        userFound ? (
          <>
            <img src={userData.image} alt="" className="w-44 h-44 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-800">{userData.username}</h1>
            <h1 className="text-lg font-semibold text-gray-800">{userData.email}</h1>

            <div className="container w-fit mx-auto p-5 flex flex-row gap-4">
              <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">follow</button>
              <button className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">share</button>
            </div>

            <div className="contianer w-fit flex flex-row gap-3">
              <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">posts</button>
              <button className="bg-gransparent font-semibold p-5">followers</button>
            </div>

            <div className="container md:w-8/12 p-5">
              {
                data.map((d) => {
                  return <PostComponent key={d.id} data={d} isUser={false} />
                })
              }
            </div>
          </>
        ) :
          <div className="h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">No such user</h1>
          </div>
      }

    </div>
  )
}
