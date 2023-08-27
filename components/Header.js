'use client'
import { auth, db } from '@/app/shared/firebaseConfig';
import { LoginContext } from '@/context/LoginContext'
import { UserContext } from '@/context/UserContext';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { ImSearch } from 'react-icons/im';
import { RxCross2 } from 'react-icons/rx'

export default function Header() {

    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const router = useRouter();
    const { userData, setUserData } = useContext(UserContext);
    const [search, setSearch] = useState('');
    const [showNavs, setShowNavs] = useState(false);
    const path = usePathname();

    if (path == '/login' || path == '/register') {
        return null;
    }

    function logout() {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsLogedIn(false);
            router.push('/login');
        })
    }


    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            setUserData(user);
        }
        else {
            null
        }
    });


    return (
        <div className="container flex gap-4 md:items-center shadow-lg flex-col md:flex-row w-full bg-slate-100 p-3">

            <div className="items-center float-left gap-3 flex flex-row">
                <div className="md:hidden block">
                    {showNavs ? <RxCross2 onClick={() => { setShowNavs(false) }} size={30} /> : <HiMenu onClick={() => { setShowNavs(true) }} size={30} />}
                </div>
                <Link href={'/'} className="text-2xl font-bold text-gray-800">N E X T - B L O G</Link>
            </div>

            <div className="container w-fit md:ms-auto rounded-xl shadow-xl flex flex-row items-center justify-center">
                <input placeholder='search by email...' onChange={(e) => { setSearch(e.target.value) }} type="text" className="p-3 w-72 rounded-s-xl border-0 focus:outline-none" />
                <Link href={`/search/${search}`} className="p-2 bg-black rounded-e-xl text-white"><ImSearch size={32} /></Link>
            </div>

            <div className="container w-fit ms-auto gap-4 items-center hidden md:flex flex-row">
                <Link href={'/'} className='font-semibold text-xl p-3 text-gray-900'>Home</Link>
                <Link href={'/create'} className='font-semibold text-xl p-3 text-gray-900'>Create</Link>
                {
                    userData ?
                        <div className="flex justify-center items-center flex-row gap-3">
                            <Link href={`/profile/${userData.email}`}>
                                <img className='w-8 h-8 mx-auto rounded-full' src={userData.photoURL} />
                            </Link>
                            <button onClick={() => { logout() }} className='font-semibold text-xl bg-slate-200 p-3 hover:bg-gray-800 hover:text-white rounded-lg text-gray-900'>Log out</button>
                        </div>
                        :
                        <Link href={'/login'} className='font-semibold text-xl bg-slate-200 p-3 hover:bg-gray-800 hover:text-white rounded-lg text-gray-900'>Login</Link>
                }
            </div>

            {
                showNavs ?
                    <div className="container h-fit md:hidden flex w-fit mx-auto gap-4 flex-col">
                        <Link href={'/'} className='font-semibold text-xl p-3 text-gray-900'>Home</Link>
                        <Link href={'/create'} className='font-semibold text-xl p-3 text-gray-900'>Create</Link>
                        {
                            userData ?
                                <div className="flex flex-col gap-3">
                                    <Link href={`/profile/${userData.email}`}>
                                        <img className='w-8 h-8 mx-auto rounded-full' src={userData.photoURL} />
                                    </Link>
                                    <button onClick={() => { logout() }} className='font-semibold text-xl bg-slate-200 p-3 hover:bg-gray-800 hover:text-white rounded-lg text-gray-900'>Log out</button>
                                </div>
                                :
                                <Link href={'/login'} className='font-semibold text-xl bg-slate-200 p-3 hover:bg-gray-800 hover:text-white rounded-lg text-gray-900'>Login</Link>
                        }
                    </div>
                    :
                    null
            }

        </div>
    )
}
