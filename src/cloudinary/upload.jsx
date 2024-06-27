const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDNAME}/auto/upload`
console.log(url)
const uploadFile = async(file)=>{
    const formData = new FormData()
    formData.append('file',file)
    formData.append("upload_preset","chat-app")

    const response = await fetch(url,{
        method : 'POST',
        body : formData
    })

    const jj = await response.json()
    console.log(jj)
return jj

  
}

export default uploadFile