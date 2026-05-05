import { Pressable, Text, View } from "react-native";
import { AppTheme } from "../AppTheme";
import { CustomInput } from "../components/CustomInput"
import Search from "../assets/search.svg"
import Filter from "../assets/filter.svg"
import Food from "../assets/food.svg"
import Amt from "../assets/amt.svg"
import Add from "../assets/add.svg"


export const Card = ({ onPress, title='', amt=0, }) => {
    return (
        <>
            <Pressable onPress={onPress} style={({ pressed }) => [{
                backgroundColor: pressed ? '#f6c99e' : 'white', height: 183,
                width: 152,
                borderRadius: 16,
                elevation: 2,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                paddingHorizontal: 16
            }]}>
                <Food />
                <Text style={{
                    fontSize: 13,
                    color: 'black',
                    fontWeight: '600'
                }}>{title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Amt />
                        <Text style={{ paddingLeft: 4 }}>{amt}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#FFF2E7',
                        height: 24,
                        width: 24,
                        borderRadius: 24,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Add />
                    </View>
                </View>
            </Pressable>
        </>
    )
}