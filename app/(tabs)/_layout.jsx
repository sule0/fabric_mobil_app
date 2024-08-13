import { StatusBar } from "expo-status-bar";
import {  Text, View, Image } from 'react-native'
import { Tabs, Redict } from 'expo-router'
import {icons} from '../../constants';

const TabIcon = ({icon, color, name, focused})=> {
  return(
    <View className="flex items-center justify-center gap-2">
      <Image source={icon}
      resizeMode='contain'
      tintColor={color}
      className="w-6 h-6" />

      <Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}>{name}</Text>
    </View>
    
  )
}

const TabsLayout = () => {
  return (
    <>

    <Tabs
    screenOptions={{
      tabBarShowLabel:false, 
      tabBarActiveTintColor: '#FFA001',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle:{
        backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 54,
      }
    }}>
      
      <Tabs.Screen 
      
      name="home" 
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({color, focused }) => (
          <TabIcon 
          icon={icons.home}
          color= {color}
          name="Home"
          focused={focused} />
        )
      }}/>
      <Tabs.Screen 
      
      name="fabric" 
      options={{
        title: 'Fabric',
        headerShown: false,
        tabBarIcon: ({color, focused }) => (
          <TabIcon 
          icon={icons.plus}
          color= {color}
          name="Fabric"
          focused={focused} />
        ) 
      }}/>

<Tabs.Screen 
      
      name="damage" 
      options={{
        title: 'Damage',
        headerShown: false,
        tabBarIcon: ({color, focused }) => (
          <TabIcon 
          icon={icons.plus}
          color= {color}
          name="Damage"
          focused={focused} />
        )
      }}/>



    
    </Tabs>
    <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

export default TabsLayout

