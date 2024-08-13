import {  Text, View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

const Damage = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
     <ScrollView className="px-6 my-4 ">
     
     <View style={styles.container}>
     </View>
          

     </ScrollView>
    </SafeAreaView>
    
  )
}

const styles= StyleSheet.create({

  container: {

    height:600,
    width:360,
    backgroundColor:"#CDCDE0",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:10
  }
  

})

export default Damage
