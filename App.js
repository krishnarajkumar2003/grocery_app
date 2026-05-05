import { SafeAreaView } from 'react-native-safe-area-context'
import { StackNavigation } from './navigations/StackNavigator'
import { View } from 'react-native'
import { AppTheme } from './AppTheme'

console.log = () => { }
console.warn = () => { }
console.error = () => { }

export const App = () => {
  return <>
    <SafeAreaView style={{ flex: 1, backgroundColor: AppTheme.white }}>
      <StackNavigation />
    </SafeAreaView>
  </>
}