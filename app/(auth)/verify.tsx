import { View, Text, Button, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import React from 'react';

export default function Verify() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Verification Page</Text>
      <Button title="Go to Home" onPress={() => router.replace('/(main)/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, fontWeight: 'bold' },
});
