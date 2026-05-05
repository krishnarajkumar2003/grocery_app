import { Alert, KeyboardAvoidingView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AppTheme } from "../AppTheme";
import Basket from "../assets/basket.svg";
import Shadow from "../assets/shadow.svg";
import { useCallback, useRef, useState } from "react";
import { AppScreens } from "./AppScreens";
import { CustomInput } from "../components/CustomInput";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthenticationScreen = ({ navigation }) => {

    const [firstName, setFirstName] = useState("");
    const [error, setError] = useState("");

    const nameRef = useRef(null);

    const handleChange = (value) => {
        setFirstName(value);
    };

    const handleContinue = useCallback(async () => {
        try {
            if (firstName === '') {
                setError("Please enter first name")
            } else {
                await AsyncStorage.setItem('username', firstName);
                nameRef.current.blur();
                setError('')
                navigation.replace(AppScreens.home)
            }
        } catch {
            Alert.alert(`Something went wrong. Try again later.`)
        }
    }, [firstName]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: AppTheme.white }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    paddingBottom: 100, // 👈 ensures button scrolls above keyboard
                }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={{ backgroundColor: AppTheme.white }}>

                    {/* TOP */}
                    <View
                        style={{
                            backgroundColor: AppTheme.appColor,
                            alignItems: "center",
                            paddingTop: 80,
                            paddingBottom: 34,
                        }}
                    >
                        <Basket height={260} width={301} />
                        <Shadow height={12} width={301} />
                    </View>

                    {/* BOTTOM */}
                    <View style={{ paddingHorizontal: 24, paddingTop: 54 }}>

                        <Text style={{ fontSize: 20, marginBottom: 10 }}>What is your firstname?</Text>

                        <CustomInput
                            ref={nameRef}
                            value={firstName}
                            onChange={handleChange}
                            placeholder="Enter your firstname"
                        />

                        {error && <Text style={{ color: "red", fontSize: 14 }}>{error}</Text>}

                        <TouchableOpacity
                            onPress={handleContinue}
                            style={{
                                marginTop: 58,
                                height: 56,
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: AppTheme.appColor,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={{ color: "white" }}>Let's Continue</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};