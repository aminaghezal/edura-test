import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { I18nProvider } from '@/lib/i18n';

export default function RootLayout() {
  return (
    <I18nProvider>
      <GestureHandlerRootView style={styles.root}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#0F0F1A' },
          }}
        />
      </GestureHandlerRootView>
    </I18nProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
