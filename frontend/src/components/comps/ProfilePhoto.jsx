import React, {useRef, useState} from 'react'
import { LuUser, LuUpload, LuTrash } from "react-icons/lu"

const ProfilePhoto = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewURL, setPreviewURL] = useState(null);

    const handleImageChange = (event)=>{
        const file = event.target.files[0];
        if(file) {
            setImage(file)
        }

        //generate preview URL from the file
        const preview = URL.createObjectURL(file);
        setPreviewURL(preview)
    }

    const handleRemoveImage = ()=>{
        setImage(null)
        setPreviewURL(null)
    }

    const onChooseFile = ()=>{
        inputRef.current.click();
    };

  return (
    <div className='flex justify-center mb-4'>
        <input 
            type="file" 
            accept="image/*" 
            ref={inputRef}
            onChange={handleImageChange}
            className='hidden'
        />

        {image ? (
            <div className='relative bg-green-100 rounded-full'>
                <img 
                    src={previewURL}
                    alt='profile photo'
                    className='w-16 h-16 text-[12px] rounded-full object-cover'
                />
                <button 
                    type='button'
                    className='cursor-pointer w-6 h-6 flex items-center justify-center bg-red-600 text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={handleRemoveImage}
                > 
                    <LuTrash className='size-3'/> 
                </button>
            </div>
        ) : (
            <div className='w-16 h-16 flex items-center justify-center bg-green-200 rounded-full relative'>
                <LuUser className='text-green-950' />
                <button 
                    type='button'
                    className='cursor-pointer w-6 h-6 flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
                    onClick={onChooseFile}
                > 
                    <LuUpload className='size-3'/> 
                </button>
            </div>
        )}
    </div>
  )
}

export default ProfilePhoto