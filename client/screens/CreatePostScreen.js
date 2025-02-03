import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageToCloudinary } from '../utils/uploadImage';

export default function CreatePostScreen() {
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    const imageUrl = await uploadImageToCloudinary(selectedImage);
    console.log('Uploaded Image:', imageUrl);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Pick an image" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />}
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
}