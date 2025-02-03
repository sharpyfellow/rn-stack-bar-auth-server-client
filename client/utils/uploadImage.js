export const uploadImageToCloudinary = async (imageUri) => {
    const data = new FormData();
    data.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'upload.jpg',
    });
    data.append('upload_preset', 'your_upload_preset');
  
    const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
      method: 'POST',
      body: data,
    });
  
    const result = await response.json();
    return result.secure_url;
  };