import React, { useState } from 'react'
import { Button, Image, View, Platform,StyleSheet, ScrollView, Text} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
return (
    <SafeAreaView className="bg-primary h-full">
     
     <ScrollView contentContainerStyle={{
        flexGrow:1
      }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
        
            <Text className="text-xl text-white font-bold text-center">
              <Text className="text-secondary-200">'Fabric'</Text> ikonuna tıklayarak kumaş tipini  öğrenebilirsin!{"\n"}
               <Text className="text-secondary-200">'Damage'</Text> ikonu ile de kumaşın hasar tespitini {" "} 
              yapabilirsin! 

            </Text>
        </View>
     </ScrollView>



    </SafeAreaView>
)
}

export default Home

