'use client'
import React, { useContext, useEffect, useState } from 'react'
import { ImFolderUpload } from 'react-icons/im'
import { app, auth, db } from '../shared/firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { UserContext } from '@/context/UserContext';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { LoginContext } from '@/context/LoginContext';
import { useRouter } from 'next/navigation';
import SideBar from '@/components/SideBar';

export default function page() {

    const { userData, setUserData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const { isLogedIn, setIsLogedIn } = useContext(LoginContext);
    const router = useRouter();



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
            }
            else {
                null
            }
        });
    }, [])


    if (!userData) {
        router.push('/login');
    }

    const showToast = () => {
        toast.success('post created succesfully');
    };

    const storage = getStorage(app);
    const postId = Date.now().toString();
    const currentDate = new Date();
    const year = currentDate.getFullYear().toString();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate().toString();
    const hours = currentDate.getHours().toString();
    const minutes = currentDate.getMinutes().toString();
    const seconds = currentDate.getSeconds().toString();


    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        file: '',
        date: day + ":" + month.toString() + ":" + year,
        time: hours + ":" + minutes + ":" + seconds,
    });
    const collectionRef = collection(db, 'posts');
    const [showSidebar, setShowSidebar] = useState(true);

    function handleFile(e) {
        setFormData({ ...formData, file: e.target.files[0] })
    }

    let n;
    let v;

    function handle(e) {
        n = e.target.name;
        v = e.target.value;
        setFormData({ ...formData, [n]: v });
    }

    async function submit(e) {
        e.preventDefault();
        setIsLoading(true);
        const storageRef = ref(storage, 'images/' + formData.file.name);
        uploadBytes(storageRef, formData.file).then((snapshot) => {
        }).then((res) => {
            getDownloadURL(storageRef).then(async (url) => {
                const postData = {
                    image: url,
                    author: userData.displayName,
                    authorImg: userData.photoURL,
                    email: userData.email,
                    id: postId,
                    date: day + "-" + month.toString() + "-" + year,
                    time: hours + ":" + minutes + ":" + seconds,
                    title: formData.title,
                    description: formData.description,
                }

                await setDoc(doc(db, 'posts', postId), postData).then(() => {
                    showToast();
                    setIsLoading(false);
                })
            }
            )
        });
    }

    return (
        <div className="conainer flex w-full h-fit md:h-screen p-0">
            {showSidebar ? <SideBar setShow={setShowSidebar} /> : null}

            <form className="md:w-10/12 bg-slate-100 mx-auto p-5 flex flex-col md:flex-row">

                <div className="container md:w-6/12 p-5 h-full">
                    <label htmlFor="imgInput">
                        <div className="container justify-center w-full h-40 md:h-full flex items-center border-dotted border-2 border-gray-700">
                            {
                                formData.file ? <img src={window.URL.createObjectURL(formData.file)} alt="" className="w-full h-auto" />
                                    :
                                    <ImFolderUpload size={60} />
                            }
                        </div>
                    </label>
                    <input type="file" id='imgInput' onChange={handleFile} name='imgInput' hidden />
                </div>

                <div className="container md:w-6/12 p-5 h-full">
                    <div className="w-full my-10">
                        <h1 className="text-2xl font-bold text-gray-800">Title</h1>
                        <input type="text" name='title' value={formData.title} onChange={handle} placeholder='title...' className="p-4 border-0 w-full my-5 focus:outline-none" required />
                    </div>
                    <div className="w-full my-10">
                        <h1 className="text-2xl font-bold text-gray-800">Description</h1>
                        <textarea type="text" name='description' value={formData.description} onChange={handle} placeholder='description...' className="p-4 resize-none border-0 h-40 w-full my-5 focus:outline-none" required />
                    </div>

                    <button onClick={submit} className="bg-black text-white text-xl font-semibold p-5 w-full">{isLoading ? <Spinner size={10} color={'white'} /> : "Create"}</button>
                </div>

            </form>

        </div>
    )
}
