import { FlatList, Modal, Pressable, Text, View
} from "react-native";
import { AppTheme } from "../AppTheme";
import Food from "../assets/food.svg";
import Amt from "../assets/amt.svg";
import { CustomButton } from "../components/CustomButton";
import { useCallback, useRef, useState } from "react";
import Close from "../assets/close.svg";
import { CustomInput } from "../components/CustomInput";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Cart = ({ navigation }) => {

  const [showModel, setModal] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [phNum, setPhNum] = useState('');
  const [deliveryError, setDeliveryError] = useState('');
  const [phNumError, setPhNumError] = useState('');
  const [cartItems, setCartItems] = useState([]);

  const deliveryRef = useRef(null);
  const phNumRef = useRef(null);

  // ✅ Load cart when screen focused
  useFocusEffect(
    useCallback(() => {
      const loadCart = async () => {
        setDeliveryAddress('');
        setPhNum('');
        setDeliveryError('');
        setPhNumError('');

        let data = await AsyncStorage.getItem('cart');

        if (data) {
          const parsed = JSON.parse(data);
          setCartItems(parsed);
        } else {
          setCartItems([]);
        }
      };

      loadCart();
    }, [])
  );

  // ✅ Calculate total
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

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
        {/* Left */}
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

            <Text style={{ fontSize: 14, color: "#777", marginTop: 4 }}>
              {item.quantity} packs
            </Text>
          </View>
        </View>

        {/* Right */}
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
            {item.price * item.quantity}
          </Text>
        </View>
      </View>
    );
  };

  // ✅ Modal handlers
  function openCheckout() {
    setModal(true);
  }

  function closeCheckout() {
    setDeliveryAddress('');
    setPhNum('');
    setDeliveryError('');
    setPhNumError('');
    setModal(false);
  }

  // ✅ Validation
  function goToConfirmOrder() {
    let isValid = true;

    if (!deliveryAddress.trim()) {
      setDeliveryError('Please enter delivery address');
      isValid = false;
    }

    if (!phNum.trim()) {
      setPhNumError('Please enter phone number');
      isValid = false;
    } else if (!/^\d{10}$/.test(phNum)) {
      setPhNumError('Enter valid 10-digit number');
      isValid = false;
    }

    deliveryRef.current?.blur();
    phNumRef.current?.blur();

    if (!isValid) return;

    setModal(false);
    navigation.navigate('ConfirmOrder');
  }

  // ✅ Empty cart UI
  if (cartItems.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: AppTheme.inputColor, marginHorizontal: 10 }}>

      <FlatList
        data={cartItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* Bottom Bar */}
      <View style={{
        height: 100,
        width: "90%",
        backgroundColor: AppTheme.white,
        position: 'absolute',
        bottom: 15,
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 10,
      }}>

        <View style={{
          width: 136,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 18,
            color: AppTheme.textColor,
            fontWeight: '600'
          }}>
            Total{'\n'}{totalAmount}
          </Text>
        </View>

        <View style={{ height: 56, paddingRight: 24 }}>
          <CustomButton text={"Checkout"} onPress={openCheckout} />
        </View>

      </View>

      {/* Modal */}
      <Modal visible={showModel} transparent animationType="slide">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: "flex-end",
          alignItems: "center"
        }}>

          <Pressable onPress={closeCheckout} style={{
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
                onChange={setDeliveryAddress}
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
                onChange={setPhNum}
              />

              {phNumError && (
                <Text style={{ color: "red", marginTop: 8 }}>
                  {phNumError}
                </Text>
              )}
            </View>

            <View style={{ height: 56, marginTop: 40 }}>
              <CustomButton text={"Confirm Order"} onPress={goToConfirmOrder} />
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
};