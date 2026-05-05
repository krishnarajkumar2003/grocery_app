import { Alert, BackHandler, FlatList, Text, View } from "react-native";
import { AppTheme } from "../AppTheme";
import { CustomInput } from "../components/CustomInput";

import Search from "../assets/search.svg";
import Filter from "../assets/filter.svg";
import { Card } from "../components/Card";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppScreens } from "./AppScreens";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = ({ navigation, route }) => {
  // const { name } = route?.params;
  const [search, setSearch] = useState("");
  const [selectedTab, setSelectedTab] = useState("Hottest");
  const searchRef = useRef(null);
  const tabs = ["Hottest", "Popular", "New combo", "Top"];
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const salads = [
    { id: 1, title: "Quinoa Fruit Salad", price: 2.0, maxQuantity: 5 },
    { id: 2, title: "Avocado Veggie Salad", price: 3.5, maxQuantity: 5 },
    { id: 3, title: "Chicken Caesar Salad", price: 4.5, maxQuantity: 5 },
    { id: 4, title: "Greek Salad", price: 3.0, maxQuantity: 5 },
    { id: 5, title: "Tropical Mix Salad", price: 2.8, maxQuantity: 5 },
  ];

  const tabData = {
    Hottest: [
      { id: 1, title: "Quinoa Fruit Salad", price: 2.0, maxQuantity: 5 },
      { id: 2, title: "Avocado Veggie Salad", price: 3.5, maxQuantity: 5 },
    ],
    Popular: [
      { id: 3, title: "Chicken Caesar Salad", price: 4.5, maxQuantity: 5 },
      { id: 4, title: "Greek Salad", price: 3.0, maxQuantity: 5 },
    ],
    "New combo": [
      { id: 5, title: "Tropical Mix Salad", price: 2.8, maxQuantity: 5 },
    ],
    Top: [
      { id: 1, title: "Quinoa Fruit Salad", price: 2.0, maxQuantity: 5 },
      { id: 3, title: "Chicken Caesar Salad", price: 4.5, maxQuantity: 5 },
    ],
  };
  const activeData = tabData[selectedTab] || [];

  useEffect(() => {
    const fetchName = async () => {
      try {
        setLoading(true);
        const data = await AsyncStorage.getItem("username");
        setName(data || "Guest");
      } catch (error) {
        Alert.alert("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const back = BackHandler.addEventListener(
        "hardwareBackPress",
        () => {
          return true;
        }
      )
      // Runs when screen comes into focus
      setSearch("");
      setSelectedTab("Hottest");
      return () => {
        back.remove();
      }
    }, [])
  );

  const filteredSalads = useMemo(() => {
    const data = search || ''
    if (!data.trim()) return salads;

    return salads.filter((item) =>
      item.title.toLowerCase().includes(data.toLowerCase())
    );
  }, [search, selectedTab]);

  // FIXED: search handler
  const onChange = useCallback((value) => {
    setSearch(value);
  }, []);

  // FIXED: navigation handler
  const goToSaladPage = useCallback(
    (data) => {
      navigation.navigate(AppScreens.saladDetails, {
        data,
      });
    },
    []
  );

  return (
    <>
      {isLoading ? <Text>Loading..</Text>
        :
        <View
          style={{
            flex: 1,
            backgroundColor: AppTheme.white,
            paddingTop: 24,
            paddingHorizontal: 24,
          }}
        >
          {/* Header */}
          <View style={{ width: 257 }}>
            <Text style={{ fontSize: 20, color: "#27214D", fontWeight: "500" }}>
              Hello {name}, What fruit salad combo do you want today?
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            {/* Search Bar */}
            <View
              style={{
                backgroundColor: AppTheme.inputColor,
                borderRadius: 10,
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
                marginTop: 24,
                height: 56,
              }}
            >
              <Search height={20} width={20} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <CustomInput
                  ref={searchRef}
                  placeholder="Search for fruit salad combos"
                  value={search}
                  onChange={onChange}
                />
              </View>
            </View>

            {/* Recommended */}
            <Text
              style={{
                marginTop: 40,
                fontSize: 24,
                color: "black",
                fontWeight: "600",
              }}
            >
              Recommended Combo
            </Text>

            {/* Horizontal Cards */}
            {filteredSalads.length === 0 && (
              <Text style={{
                marginTop: 20, fontSize: 16, color: AppTheme.textColor, textAlign: "center"
              }}>No results found</Text>
            )}
            {
              filteredSalads.length > 0 && (
                <FlatList
                  data={filteredSalads}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.id.toString()}
                  contentContainerStyle={{ marginTop: 24 }}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                  renderItem={({ item }) => (
                    <Card
                      title={item.title}
                      amt={item.price}
                      onPress={() => goToSaladPage(item)}
                    />
                  )}
                />
              )
            }

            {/* Tabs */}
            <FlatList
              data={tabs}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              contentContainerStyle={{ marginTop: 48 }}
              ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
              renderItem={({ item }) => {
                const isActive = selectedTab === item;

                return (
                  <View style={{ alignItems: "center" }}>
                    <Text
                      onPress={() => setSelectedTab(item)}
                      style={{
                        fontSize: 16,
                        color: "#27214D",
                        fontWeight: isActive ? "600" : "400",
                      }}
                    >
                      {item}
                    </Text>

                    {/* UNDERLINE */}
                    <View
                      style={{
                        marginTop: 6,
                        height: 2,
                        width: "100%",
                        backgroundColor: isActive ? "#FFA451" : "transparent",
                        borderRadius: 2,
                      }}
                    />
                  </View>
                );
              }}
            />

            {/* Bottom Cards */}
            <FlatList
              data={activeData}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ marginTop: 24 }}
              ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              renderItem={({ item }) => (
                <Card
                  title={item.title}
                  amt={item.price}
                  onPress={() => goToSaladPage(item)}
                />
              )}
            />
          </View>
        </View>}
    </>
  );
};