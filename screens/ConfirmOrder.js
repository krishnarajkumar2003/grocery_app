import { useFocusEffect } from "@react-navigation/native"
import { useCallback } from "react"
import { BackHandler, Text, View } from "react-native"
import { AppTheme } from "../AppTheme"
import LottieView from "lottie-react-native";
import { CustomButton } from "../components/CustomButton";

export const ConfirmOrder = () => {
    useFocusEffect(
        useCallback(() => {
            const back = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    return false;
                }
            )
            return () => {
                back.remove();
            }
        }, [])
    )
    return (
        <>
            <View style={{ flex: 1, backgroundColor: AppTheme.white, paddingHorizontal: 97, paddingVertical: 160, alignItems: 'center' }}>
                <LottieView
                    source={require('../assets/success.json')}
                    autoPlay
                    loop={false}
                    speed={1}
                    style={{ width: 150, height: 150 }}
                />


                <Text style={{
                    marginTop: 56,
                    fontSize: 26,
                    color: 'black',
                    fontWeight: '600'
                }}>Congratulations!!!</Text>

                <Text style={{
                    marginTop: 25,
                    fontSize: 16,
                    textAlign: 'center'
                }}>
                    Your order have been taken and is being attended to
                </Text>

                <View style={{
                    height: 56,
                    marginTop: 56,
                    width: '100%'

                }}>
                    <CustomButton text={"Track My Order"} />
                </View>

                <View style={{
                    height: 56,
                    marginTop: 56,
                    width: '100%'

                }}>
                    <CustomButton text={"Continue shopping"} />
                </View>
            </View>
        </>
    )
}