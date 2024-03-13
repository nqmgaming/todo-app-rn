import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useAuth } from "./auth";
import { router } from "expo-router";

const modal = () => {
  const { logOut, isLoggedIn, logIn } = useAuth();
  return (
    <View
      style={{
        flex: 1,
        marginTop: 16,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          alignContent: "center",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        {isLoggedIn
          ? "You are logged in. Click the button below to log out."
          : "You are not logged in. Click the button below to log in."}
      </Text>
      <TouchableOpacity
        onPress={() => {
          isLoggedIn ? logOut() : logIn();
        }}
        style={{
          backgroundColor: "blue",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
          width: "60%",
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          {isLoggedIn ? "Log out" : "Log in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default modal;

const styles = StyleSheet.create({});
