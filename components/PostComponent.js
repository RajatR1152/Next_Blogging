'use client'
import { db } from '@/app/shared/firebaseConfig';
import { CountContext } from '@/context/Count';
import { deleteDoc, doc } from 'firebase/firestore';
import Link from 'next/link'
import { React, useContext } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'

export default function PostComponent({ data, isUser }) {

    const { count, setCount } = useContext(CountContext);

    async function deletePost(id) {

        if (confirm("confirm to delete") == true) {
            const postDoc = doc(db, "posts", id);
            setCount(count + 1);
            await deleteDoc(postDoc).then(() => {
                window.location.reload();
            })
        } else {

        }
    }


    return (
        <div className='container w-full my-5 shadow-2xl bg-slate-50 py-10 px-5'>
            <div className="container items-center w-full gap-4 flex flex-row p-2">
                <img src={data.authorImg} alt="" className="w-8 h-8 rounded-full" />
                <Link href={`/search/${data.email}`} className="container flex flex-col gap-1">
                    <h2 className="text-lg font-semibold text-gray-800">{data.author}</h2>
                    <h2 className="text-sm font-semibold text-gray-800">{data.email}</h2>
                </Link>

                {
                    isUser ? <AiOutlineDelete onClick={() => { deletePost(data.id) }} size={30} className='ms-auto cursor-pointer' /> : null
                }

            </div>

            <div className="container my-5">
                <h1 className="text-sm text-gray-700 font-semibold"> {data.date}</h1>
                <h1 className="text-sm text-gray-700 font-semibold"> {data.time}</h1>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 my-4">{data.title}</h1>
            <img src={data.image} className='w-full' alt={data.title} />
            <p className="text-lg font-semibold mt-5 leading-8"></p>
            <p className="text-lg font-semibold mt-5 leading-8">{data.description.split(".", 3)}</p>
            <br />
            <Link href={`/post/${data.id}`} className="p-4 text-lg font-bold  text-white bg-black my-8">continue reading...</Link>
        </div>
    )
}