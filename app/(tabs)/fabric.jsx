import { useState } from 'react';
import { Button, Image, View, StyleSheet, ScrollView, Text, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import StartButton from '../../components/StartButton';
import { icons } from "../../constants";

export default function Fabric() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [uploading, setUploading] = useState(false);

  const chooseImage = () => {
    Alert.alert(
      'Resim Ekle',
      'Fotoğraf eklemek için bir seçenek seçin',
      [
        { text: 'Galeriden Seç', onPress: pickImage },
        { text: 'Kamera ile Çek', onPress: takePhoto },
        { text: 'İptal', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const pickImage = async () => {
    // İzin isteme
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Resim seçme izni verilmedi.');
      return;
    }
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    // Kamera izni isteme
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera izni verilmedi.');
      return;
    }
    // Kamera başlatma
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const predictImage = async () => {
    if (!image) {
      alert("Lütfen önce bir resim seçin.");
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: 'image.jpg',
      type: 'image/jpeg',
    });
    setUploading(true);
    try {
      //console.log("Tahmin işlemi başlıyor...");
      const response = await axios.post('http://192.168.1.129/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { predicted_class, confidence_score } = response.data;

      //console.log("Tahmin işlemi başarıyla tamamlandı:", predicted_class, confidence_score);
      setPrediction(`Kumaş tipi: ${predicted_class}, Doğruluk oranı: ${confidence_score}`);
      
    } catch (error) {
      console.error(error);
    } finally{
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <View>
          <Text style={{ color: 'white', fontStyle: 'italic', textAlign: 'center', padding: 10, fontWeight: '300' }}>Herhangi bir kumaşın tipini öğrenmek için aşağıya tıklayarak fotoğraf ekleyin.</Text>
          <TouchableOpacity onPress={() => chooseImage()}>
            {image ? (
              <Image
                source={{ uri: image }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
                
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">

                  <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-1/2 h-1/2 items-center"
                />
                </View>
              </View>
            )}
          </TouchableOpacity>

          <Text style={{ color: 'white', fontStyle: 'italic', textAlign: 'center', padding: 10, fontWeight: '300' }}>Daha sonra bunun tahmini için aşağıdaki butona tıklayınız.</Text>
          <StartButton title="Tahmin et" handlePress={predictImage} isLoading={uploading} />
          {prediction !== '' && (
            <Text style={styles.predictionText}>{prediction}</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  predictionText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    fontStyle:"italic"
  },
});
