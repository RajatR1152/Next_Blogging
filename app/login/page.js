'use client'
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth, db, provider } from '../shared/firebaseConfig'
import { LoginContext } from '@/context/LoginContext'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { UserContext } from '@/context/UserContext'
import { doc, setDoc } from 'firebase/firestore'


export default function page() {

    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const router = useRouter();
    const { userData, setUserData } = useContext(UserContext);

    function login() {
        signInWithPopup(auth, provider).then((res) => {
            localStorage.setItem('isLogedIn', true);

            onAuthStateChanged(auth, async(user) => {
                if (user) {
                    const uid = user.uid;
                    let data = {
                        username: user.displayName,
                        email: user.email,
                        image: user.photoURL
                    }
                    await setDoc(doc(db, 'users', uid), data);
                    setUserData(data);
                }
                else {
                    null
                }
            });


            setIsLogedIn(true);
            router.push('/');
        })
    }

    return (
        <div className='items-center justify-center flex bg-no-repeat bg-cover bg-[url(https://img.freepik.com/premium-vector/modern-dynamic-stripes-colorful-abstract-geometric-design-background-business-card-presentation-brochure-banner-wallpaper_249611-1023.jpg?size=626&ext=jpg)] p-5 flex-row h-screen'>
            <button className='bg-black text-white flex flex-row gap-4 font-bold p-5 text-2xl' onClick={login}><FcGoogle size={35} />Login with google</button>
        </div>
    )
}
