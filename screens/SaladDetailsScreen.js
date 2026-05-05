import { Alert, Pressable, ScrollView, Text, View } from "react-native"
import { AppTheme } from "../AppTheme"
import Food from "../assets/food.svg"
import Minus from "../assets/minus.svg"
import Add from "../assets/add.svg"
import Amt from "../assets/amt.svg"
import UnFav from "../assets/unfav.svg"
import { CustomButton } from "../components/CustomButton"
import { useCallback, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const SaladDetailsScreen = ({ route }) => {
    const { data } = route.params;
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        return () => {
            setQuantity(1)
        }
    }, [])

    const increaseQuantity = () => {
        if (quantity < data.maxQuantity) {
            setQuantity(quantity + 1)
        }
    }


    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const addToBasket = useCallback(async (salad) => {
        try {
            let item = data;
            item = {
                ...item,
                quantity: quantity
            }
            let salads = JSON.parse(await AsyncStorage.getItem('cart')) || []
            const isDuplicate = salads.find((item) => item.is === salad.id)
            console.log('--12121s', salads)
            if (isDuplicate) {
                Alert.alert(`Salad already in cart.`)
            } else {
                console.log('----> SLAARDs', salads)
                salads = [...salads, item]
                console.log('----> SLAARDs new adddd', salads)
                await AsyncStorage.setItem('cart', JSON.stringify(salads))
            }
        } catch (error) {
            Alert.alert(`Something went wrong. Try again later.`)
        }
    }, [])

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, backgroundColor: AppTheme.appColor }}
        >

            {/* Top section */}
            <View
                style={{
                    height: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Food height={176} width={176} />
            </View>


            {/* Bottom container */}
            <View
                style={{
                    backgroundColor: AppTheme.white,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    paddingHorizontal: 24,
                    paddingTop: 30,
                    paddingBottom: 40,
                    height: '100%'
                }}
            >
                {/* Title */}
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '600',
                        color: AppTheme.textColor,
                    }}
                >
                    {data.title}
                </Text>

                {/* Row (Counter + Price) */}
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 32,
                    }}
                >
                    {/* Counter */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 12,
                        }}
                    >
                        <Pressable onPress={decreaseQuantity}>
                            <View style={styles.circleBtn}>
                                <Minus />
                            </View>
                        </Pressable>

                        <Text style={{ fontSize: 18, color: AppTheme.textColor }}>
                            {quantity}
                        </Text>

                        <Pressable onPress={increaseQuantity}>
                            <View style={[styles.circleBtn, styles.addBtn]}>
                                <Add />
                            </View>
                        </Pressable>
                    </View>

                    {/* Price */}
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 6,
                        }}
                    >
                        <Amt height={16} width={20} />
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: '600',
                                color: AppTheme.textColor,
                            }}
                        >
                            {data.price}
                        </Text>
                    </View>
                </View>

                {/* Description */}
                <View style={{ marginTop: 40 }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: AppTheme.textColor,
                        }}
                    >
                        One Pack Contains:
                    </Text>

                    <Text
                        style={{
                            marginTop: 8,
                            fontSize: 14,
                            color: AppTheme.textColor,
                            lineHeight: 20,
                        }}
                    >
                        Red Quinoa, Lime, Honey, Blueberries, Strawberries, Mango, Fresh mint.
                    </Text>
                </View>

                <Text style={{
                    marginTop: 44,
                    fontSize: 16,
                    color: AppTheme.textColor
                }}>If you are looking for a new fruit salad to eat today, quinoa is the perfect brunch for you. make</Text>

                <View style={{
                    marginTop: 43,
                    height: 60,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: "center"
                }}>
                    <View style={[styles.circleBtn, styles.addBtn]}>
                        <UnFav />
                    </View>
                    <CustomButton text={"Add to basket"} onPress={() => addToBasket(data)} />
                </View>
            </View>


        </ScrollView>
    )
}

const styles = {
    circleBtn: {
        borderWidth: 1,
        borderColor: '#000',
        height: 48,
        width: 48,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addBtn: {
        backgroundColor: '#FFF2E7',
        borderWidth: 0,
    },
}