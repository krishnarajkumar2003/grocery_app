import { View } from "react-native"
import Logo from "../assets/logo.svg"
import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react";
import { AppScreens } from "./AppScreens";
export const SplashScreen = ({navigation}) => {
    useFocusEffect(
        useCallback(()=>{
            const timer = setTimeout(() => {
                navigation.replace(AppScreens.welcome)
            }, 3000);
            return () => {
                clearTimeout(timer)
            }
        },[])
    );
    return <>
        <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent:'center', alignItems:'center' }}>
            <Logo height={205.05} width={184} />
        </View>
    </>
}