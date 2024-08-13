import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {images} from '../constants'
import StartButton from '../components/StartButton';

const App =()=> {

  return (
    <SafeAreaView className="bg-primary h-full">
      
      <ScrollView contentContainerStyle={{
        flexGrow:1
      }}>

        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image source={images.logo}
          className="w-[200px] h-[150px]"
          resizeMode='contain'
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Kumaş Tipi Öğren ve{"\n"}
               Hasar Tespiti {" "}
              <Text className="text-secondary-200">Yap</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            /></View>
             
            <StartButton
            title="Başla"
            handlePress={() => router.push("/(tabs)/home")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />   
    </SafeAreaView>
  );
}

export default  App;
 


