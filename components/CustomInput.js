import { Keyboard, TextInput } from "react-native";
import { AppTheme } from "../AppTheme";

export const CustomInput = ({
    placeholder = "",
    value,
    onChange,
    ref = null,
    width = "100%",
    KeyboardType = "default",
}) => {

    function dismiss() {
        Keyboard.dismiss()
    }
    return (
        <TextInput
            ref={ref}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="grey"
            autoCorrect={false}
            autoCapitalize="words"
            onBlur={dismiss}
            keyboardType={KeyboardType}

            style={{
                height: 56,
                width: width, // ✅ FIXED
                backgroundColor: AppTheme.inputColor,
                borderRadius: 10,
                // borderWidth: 1,
                borderColor: "",
                marginTop: 0, // ✅ FIXED
                paddingHorizontal: 16,
                fontSize: 16,
                textAlignVertical: "center",
            }}
        />
    );
};