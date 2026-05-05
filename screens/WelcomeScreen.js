import { Text, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../AppTheme";
import Basket from '../assets/basket.svg'
import Shadow from '../assets/shadow.svg'
import { useCallback } from "react";
import { AppScreens } from "./AppScreens";
export const WelcomeScreen = ({ navigation }) => {
    const handleContinue = useCallback(() => {
        navigation.replace(AppScreens.authentication)
    }, []);
    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 0.6, backgroundColor: AppTheme.appColor, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 34 }}>
                <View style={{ height: 300, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Basket height={260} width={301} />
                    <Shadow height={12} width={301} />
                </View>
            </View>
            <View style={{ flex: 0.4, paddingHorizontal: 24, paddingTop: 54 }}>
                <Text style={{ fontSize: 20, color: 'black' }}>Get the Freshest Fruits salad combo</Text>
                <Text style={{ fontSize: 16, paddingTop: 8, color: 'black', lineHeight: 24 }}>We deliver the best and freshest fruit salad in town. Order for combo today!!!</Text>
                <TouchableOpacity onPress={handleContinue} style={{ backgroundColor: AppTheme.appColor, height: 56, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, marginTop: 58, }}>
                    <Text style={{ fontSize: 16, fontWeight: "bold", color:AppTheme.white}}>Let's Continue</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};