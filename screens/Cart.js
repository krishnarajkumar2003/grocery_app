import { FlatList, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { AppTheme } from "../AppTheme";
import Food from "../assets/food.svg";
import Amt from "../assets/amt.svg";
import { CustomButton } from "../components/CustomButton";
import { useCallback, useRef, useState } from "react";
import Close from "../assets/close.svg";
import { CustomInput } from "../components/CustomInput";
import { useFocusEffect } from "@react-navigation/native";

export const Cart = ({ navigation }) => {

  const [showModel, setModal] = useState(false)

  const [deliveryAddress, setDeliveryAddress] = useState('')

  const [phNum, setPhNum] = useState('')

  const deliveryRef = useRef(null);

  const phNumRef = useRef(null);

  const [deliveryError, setDeliveryError] = useState('');

  const [phNumError, setPhNumError] = useState('');


  const cartItems = [
    {
      id: 1,
      title: "Quinoa Fruit Salad",
      packs: 2,
      price: 2000,
    },
    {
      id: 2,
      title: "Avocado Veggie Salad",
      packs: 1,
      price: 1500,
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 16,
          backgroundColor: AppTheme.white,
          borderRadius: 16,
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left Section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Food height={64} width={64} />

          <View style={{ marginLeft: 16, maxWidth: 160 }}>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: AppTheme.textColor,
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                fontSize: 14,
                color: "#777",
                marginTop: 4,
              }}
            >
              {item.packs} packs
            </Text>
          </View>
        </View>

        {/* Right Section */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Amt height={18} width={18} />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 16,
              fontWeight: "600",
              color: AppTheme.textColor,
            }}
          >
            {item.price}
          </Text>
        </View>
      </View>
    );
  };

  function openCheckout() {
    setModal((value) => {
      if (value) {
        setDeliveryAddress('')
        setPhNum('')
        setDeliveryError('');
        setPhNumError('');
      }
      return !value;
    })
  }

  function handleDeliveryAddressChange(value) {
    setDeliveryAddress(value)
  }

  function handlePhNumChange(value) {
    setPhNum(value)
  }

  function goToConfirmOrder() {
    let isValid = true;

    if (deliveryAddress === '') {
      setDeliveryError('Please enter delivery address');
      isValid = false;
    }

    if (phNum === '') {
      setPhNumError('Please enter phone number');
      isValid = false;
    }

    deliveryRef.current?.blur();
    phNumRef.current?.blur();

    if (!isValid) return; // 🚫 stop here if validation fails
    setModal(false);
    navigation.navigate('ConfirmOrder');
  }


  useFocusEffect(
    useCallback(() => {
      setDeliveryAddress('')
      setPhNum('')
      setDeliveryError('');
      setPhNumError('');
    }, [])
  )

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: AppTheme.inputColor, marginHorizontal: 10, alignItems: 'center' }}>

        <FlatList
          data={cartItems}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />


        <View style={{
          height: 100,
          width: "90%",
          backgroundColor: AppTheme.white,
          position: 'absolute',
          bottom: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          borderRadius: 10,
        }}>


          <View style={{
            width: 136,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 25
          }}>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                color: AppTheme.textColor,
                fontWeight: '600'
              }}>Total{'\n'}2,000</Text>
          </View>


          <View style={{
            height: 56,
            paddingRight: 24
          }}>

            <CustomButton text={"Checkout"} onPress={openCheckout} />
          </View>

        </View>


        <Modal visible={showModel} transparent={true} animationType="slide" >
          <View style={{
            flex: 1,
            backgroundColor: 'rgb(0,0,0,0.5)',
            justifyContent: "flex-end",
            alignItems: "center"
          }}>
            <Pressable onPress={openCheckout} style={{
              backgroundColor: AppTheme.white,
              height: 50,
              width: 50,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <Close />
            </Pressable>

            <View style={{
              backgroundColor: AppTheme.white,
              paddingVertical: 40,
              paddingHorizontal: 24,
              flex: 0.5,
              width: '100%',
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,

            }}>


              {/* Address */}
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 20 }}>Delivery Address</Text>

                <CustomInput
                  placeholder="Enter your address"
                  value={deliveryAddress}
                  ref={deliveryRef}
                  onChange={handleDeliveryAddressChange}
                />

                {deliveryError && (
                  <Text style={{ color: "red", marginTop: 8 }}>
                    {deliveryError}
                  </Text>
                )}
              </View>

              {/* Phone */}
              <View style={{ marginTop: 24 }}>
                <Text style={{ fontSize: 20 }}>Number we can call</Text>

                <CustomInput
                  keyboardType="numeric"
                  placeholder="Enter phone number"
                  value={phNum}
                  ref={phNumRef}
                  onChange={handlePhNumChange}
                />

                {phNumError && (
                  <Text style={{ color: "red", marginTop: 8 }}>
                    {phNumError}
                  </Text>
                )}
              </View>

              <View style={{
                height: 56,
                width: '100%',
                // backgroundColor: AppTheme.inputColor,
                marginTop: 40,
              }}>
                <CustomButton text={"Confirm Order"} onPress={goToConfirmOrder} />
              </View>

            </View>
          </View>
        </Modal>


      </View>
    </ScrollView>
  );
};