const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`

const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app")

    const response = await fetch(url,{
        method : 'POST',
        body : formData
    })

    const jj = await response.json()
  
return jj

  
}

export default uploadFile