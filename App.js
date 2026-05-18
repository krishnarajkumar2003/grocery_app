import { SafeAreaView } from 'react-native-safe-area-context'
import { DrawerNavigation } from './navigations/DrawerNavigator'
import { AppTheme } from './AppTheme'
import { NavigationContainer } from "@react-navigation/native"

// ⚠️ Don't kill errors completely in dev

  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}

export const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: AppTheme.white }}>
      <NavigationContainer>
        <DrawerNavigation />
      </NavigationContainer>
    </SafeAreaView>
  )
}