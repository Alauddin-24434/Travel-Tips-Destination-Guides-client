// utils/uploadImageToCloudinary.ts
const uploadImageToCloud = async (file: File) => {
    const cloudName = 'dzzokyuu0'; // replace with your Cloudinary cloud name
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'zrecm5r0'); // replace with your upload preset
  
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
  
    const data = await response.json();
    return data.secure_url; // return the URL of the uploaded image
  };
  
  export default uploadImageToCloud;
  