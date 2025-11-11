import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Page</Text>
      <Button title="Verify Account" onPress={() => router.push('/(auth)/verify')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
