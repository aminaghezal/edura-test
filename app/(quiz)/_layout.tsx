import { Stack } from 'expo-router';

export default function QuizLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        contentStyle: { backgroundColor: '#0F0F1A' },
        gestureEnabled: false, // prevent accidental swipe-back mid-quiz
      }}
    />
  );
}
