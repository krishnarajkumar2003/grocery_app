import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/SplashScreen";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { AppScreens } from '../screens/AppScreens'
import { AuthenticationScreen } from "../screens/AuthenticationScreen";
import { HomeScreen } from "../screens/HomeScreen";
import { CustomHeader } from "../components/Header"
import { SaladDetailsScreen } from "../screens/SaladDetailsScreen"
import { Cart } from "../screens/Cart"
import { ConfirmOrder } from "../screens/ConfirmOrder"

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={AppScreens.splash}>
      
      <Stack.Screen
        name={AppScreens.splash}
        component={SplashScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={AppScreens.welcome}
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={AppScreens.authentication}
        component={AuthenticationScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={AppScreens.home}
        component={HomeScreen}
        options={{
          header: (props) => <CustomHeader {...props} isHome />
        }}
      />

      <Stack.Screen
        name={AppScreens.saladDetails}
        component={SaladDetailsScreen}
        options={{
          header: (props) => <CustomHeader {...props} />
        }}
      />

      <Stack.Screen
        name={AppScreens.cart}
        component={Cart}
        options={{
          header: (props) => <CustomHeader {...props} />
        }}
      />

      <Stack.Screen
        name={AppScreens.confirmOrder}
        component={ConfirmOrder}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  )
}