'use client'
import { auth, db } from '@/app/shared/firebaseConfig';
import PostComponent from '@/components/PostComponent';
import { CountContext } from '@/context/Count';
import { LoginContext } from '@/context/LoginContext';
import { UserContext } from '@/context/UserContext';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function page() {

    const user = useParams();
    const { userData, setUserData } = useContext(UserContext);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const [data, setData] = useState([]);
    const { count, setCount } = useContext(CountContext);
    const router = useRouter();

    function logOut() {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsLogedIn(false);
            router.push('/login');
        })
    }

    useEffect(() => {
        getUsersPosts();
        onAuthStateChanged(auth, (user) => {
            if (user) {

                const uid = user.uid;              
                setUserData(user);
            }
            else {
                null
            }
        });
    }, [count]);

    
    if (!userData) {
        router.push('/login');
    }

    async function getUsersPosts() {
        const q = query(collection(db, 'posts'), where("email", "==", user.email.replace("%40", "@")));

        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            setData(data => [...data, doc.data()]);
            ;
        })
    }


    return (
        <div className="cotnainer w-full flex  gap-4 flex-col items-center justify-center p-5">

            <img src={userData.photoURL} alt="" className="w-44 h-44 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-800">{userData.displayName}</h1>
            <h1 className="text-lg font-semibold text-gray-800">{userData.email}</h1>

            <div className="container w-fit mx-auto p-5 flex flex-row gap-4">
                <button onClick={() => { logOut() }} className="bg-gray-300 text-lg font-bold text-black rounded-full py-3 px-5 ">log out</button>
            </div>

            <div className="contianer w-fit flex flex-row gap-3">
                <button className="bg-gransparent border-b-2 font-semibold border-gray-800 p-2">created</button>
                <button className="bg-gransparent font-semibold p-5">saved</button>
            </div>

            <div className="container md:w-8/12 p-5">
                {
                    data.map((d) => {
                        return <PostComponent key={d.id} data={d} isUser={true} />
                    })
                }
            </div>

        </div>
    )
}
