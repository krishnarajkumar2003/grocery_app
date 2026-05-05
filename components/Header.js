import { Pressable, Text, View } from "react-native"
import { AppTheme } from "../AppTheme.js"
import Menu from "../assets/menu.svg"
import Cart from "../assets/cart.svg"
import Back from "../assets/back.svg"
import { useCallback } from "react"
import { AppScreens } from "../screens/AppScreens.js"
export const CustomHeader = ({ isHome = false, navigation, route }) => {

    const handleBack = useCallback(() => {
        navigation.goBack()
    }, [])

    const handleGotoCard = useCallback(() => {
        navigation.navigate(AppScreens.cart)
    }, [])

    return (
        <>
            {isHome ? <View style={{ height: 42, width: '100%', backgroundColor: AppTheme.white, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24 }}>
                <Menu />
                <Pressable onPress={handleGotoCard}>
                    <Cart />
                </Pressable>
            </View> : <>
                <View style={{ height: 80, width: '100%', backgroundColor: AppTheme.appColor, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop: 28, paddingHorizontal: 24 }}>
                    <Pressable onPress={handleBack} style={{ height: 32, width: 80, backgroundColor: AppTheme.white, borderRadius: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, justifyContent: 'space-between', gap: 5 }}>
                        <Back />
                        <Text>Go Back</Text>
                    </Pressable>
                    {/* <Text style={{
                        fontSize: 19,
                        marginLeft: 34,
                        color: AppTheme.white,
                        fontWeight: "500"
                    }}>{route.name}</Text> */}
                </View>
            </>
            }
        </>
    )
}