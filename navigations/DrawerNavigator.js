import { createDrawerNavigator } from "@react-navigation/drawer"
import { AppScreens } from "../screens/AppScreens"
import { StackNavigation } from "./StackNavigator"

const Drawer = createDrawerNavigator();

export const DrawerNavigation = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name={AppScreens.stack}
        component={StackNavigation}
      />
    </Drawer.Navigator>
  )
}