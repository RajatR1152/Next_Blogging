'use client'
import { db } from '@/app/shared/firebaseConfig';
import { collection, getDocs, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import PostComponent from './PostComponent';

export default function Posts() {

    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    async function getPosts() {
        setPostsList([]);
        const q = query(collection(db, 'posts'));
        const data = await getDocs(q);
        data.forEach((e) => {
            setPostsList(postsList => [...postsList, e.data()]);
        });
    }

    return (
        <div className="container h-screen overflow-y-auto mx-auto md:w-7/12 p-5">
            {
                postsList.map((p) => {
                    return <PostComponent data={p} isUser={false} key={p.id} />
                })
            }
        </div>
    )
}
