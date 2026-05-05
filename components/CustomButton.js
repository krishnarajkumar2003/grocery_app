import { Pressable, Text } from "react-native";
import { AppTheme } from "../AppTheme";

export const CustomButton = ({ text, onPress }) => {
    return (
        <>
            <Pressable
                onPress={onPress}
                style={{
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: AppTheme.appColor,
                    height: '100%',
                    borderRadius: 10
                }}>
                <Text style={{
                    fontSize: 16,
                    color: AppTheme.white
                }}>{text}</Text>
            </Pressable>
        </>
    );
}