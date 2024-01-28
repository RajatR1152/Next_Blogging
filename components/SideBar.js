'use client'
import { auth } from '@/app/shared/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { HiHome, HiPlus, HiUser } from 'react-icons/hi';
import { LuNewspaper } from 'react-icons/lu'
import { RxCross2 } from 'react-icons/rx';

export default function SideBar({ setShow }) {

    const [userData, setUserData] = useState([]);

    const path = usePathname();

    console.log("path", path);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                let data = {
                    username: user.displayName,
                    email: user.email,
                    image: user.photoURL
                }
                setUserData(data);
                console.log(data);
            }
            else {
                null;
            }
        });
    }, [])

    return (
        <div className="container w-8/12 absolute md:relative md:w-2/12 h-screen bg-white mt-1 flex flex-col gap-10 p-5 shadow-lg">

            <RxCross2 size={25} onClick={()=>{setShow(false)}} className='font-bold block md:hidden cursor-pointer text-gray-800 ms-auto' />

            <div className="container w-full flex items-center gap-3">
                <img src={userData?.image} alt="" className="w-8 h-8 rounded-full" />
                <h1 className="text-center font-bold text-md">{userData?.username}</h1>
            </div>

            <div className="container w-full flex flex-col gap-6">
                <Link href={'/create'} className={path == '/create' ? "py-3 px-5 border w-fit flex gap-3 bg-gray-300 hover:shadow-xl rounded-full" : "py-3 px-5 border w-fit flex gap-3 border-gray-300 hover:shadow-xl rounded-full"}><HiPlus size={25} />create</Link>
                <Link href={'/'} className={path == '/' ? "py-3 px-5 border w-fit flex gap-3 bg-gray-300 hover:shadow-xl rounded-full" : "py-3 px-5 border w-fit flex gap-3 border-gray-300 hover:shadow-xl rounded-full"}><HiHome size={25} />home</Link>
                <Link href={`/profile/${userData?.email}`} className={path == '/posts' ? "py-3 px-5 border w-fit flex gap-3 bg-gray-300 hover:shadow-xl rounded-full" : "py-3 px-5 border w-fit flex gap-3 border-gray-300 hover:shadow-xl rounded-full"}><LuNewspaper size={25} />posts</Link>
                <Link href={`/profile/${userData?.email}`} className={path == '/profile' ? "py-3 px-5 border w-fit flex gap-3 bg-gray-300 hover:shadow-xl rounded-full" : "py-3 px-5 border w-fit flex gap-3 border-gray-300 hover:shadow-xl rounded-full"}><HiUser size={25} />profile</Link>
            </div>


        </div>
    )
}