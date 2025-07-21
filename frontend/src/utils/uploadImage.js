import axiosInstance from "@/lib/axios";

const uploadImage = async (imageFile) =>{
    const formData = new FormData()
    //Append image file to form data
    formData.append("image", imageFile)

    try{
        const response = await axiosInstance.post("/auth/upload-image", formData);
         return response.data; // return response data
    } catch (error){
        console.error('Error uploading image', error);
        throw error;
    }
};

export default uploadImage


// {
//             headers: {
//                 'Content-Type': 'multipart/form-data', //set header for file upload
//             },
//         }