import { SafeAreaView, TouchableOpacity } from "react-native";
import { useAuth } from "./auth";
import { View, Button, Text, TextInput, StyleSheet } from "react-native";
import { router } from "expo-router";

const index = () => {
  const { logIn } = useAuth();

  const handleLogin = () => {
    logIn();
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <View style={styles.inputContainer}>
        <Text>Username</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputContainer}>
        <Text>Password</Text>
        <TextInput style={styles.input} secureTextEntry />
      </View>
      <Button title="Forgot password?" />
      <View style={styles.button}>
        <TouchableOpacity
          onPress={handleLogin}
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
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    padding: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
    marginTop: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
  },
  button: {
    marginTop: 16,
    alignItems: "center",
  },
});
