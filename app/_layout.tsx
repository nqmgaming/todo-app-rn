import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AuthProvider } from "./auth";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
