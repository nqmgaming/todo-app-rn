import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Alert,
  Modal,
} from "react-native";
import CheckBox from "expo-checkbox";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useAuth } from "@/app/auth";
import { router } from "expo-router";
const TodoList = () => {
  const [todos, setTodos] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [completeCount, setcompleteCount] = useState(0);
  const [incompleteCount, setincompleteCount] = useState(0);
  const [showModal, setshowModal] = useState(false);
  const [todo, settodo] = useState([]);
  const { isLoggedIn, logOut } = useAuth();

  const getTodos = useCallback(async () => {
    try {
      await getDocs(collection(FIREBASE_DB, "todos")).then((querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        console.log("Todos", data);
        setTodos(data);
      });
    } catch (error) {
      console.error("Error getting todos", error);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  const completeCountMemo = useMemo(() => {
    return todos.filter((todo) => todo.completed).length;
  }, [todos]);

  const incompleteCountMemo = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  useEffect(() => {
    setcompleteCount(completeCountMemo);
    setincompleteCount(incompleteCountMemo);
  }, [completeCountMemo, incompleteCountMemo]);

  const addTodo = useCallback(async () => {
    try {
      await addDoc(collection(FIREBASE_DB, "todos"), {
        title,
        content,
        completed: false,
      });
      setTitle("");
      setContent("");
      getTodos();
      Alert.alert("Todo added");
      console.log("Todo added");
    } catch (error) {
      console.error("Error adding todo", error);
    }
  }, [title, content]);

  const deleteTodo = useCallback(
    async (index: number) => {
      try {
        await deleteDoc(doc(FIREBASE_DB, "todos", todos[index].id));
        Alert.alert("Todo deleted");
        console.log("Todo deleted");
        getTodos();
      } catch (error) {
        console.error("Error deleting todo", error);
      }
    },
    [todos]
  );

  const updateTodo = useCallback(async () => {
    try {
      await setDoc(
        doc(FIREBASE_DB, "todos", todo.id),
        {
          title: todo.title,
          content: todo.content,
        },
        { merge: true }
      );
      getTodos();
      setshowModal(!showModal);
      Alert.alert("Todo updated");
      console.log("Todo updated");
    } catch (error) {
      console.error("Error updating todo", error);
    }
  }, [todo]);

  const toggleComplete = useCallback(
    async (index: number) => {
      try {
        await setDoc(
          doc(FIREBASE_DB, "todos", todos[index].id),
          {
            completed: !todos[index].completed,
          },
          { merge: true }
        );
        getTodos();
        console.log("Todo updated");
      } catch (error) {
        console.error("Error updating todo", error);
      }
    },
    [todos]
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Content"
          value={content}
          onChangeText={setContent}
          style={styles.input}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <View style={[styles.total, { backgroundColor: "lightgreen" }]}>
          <AntDesign name="checkcircle" size={24} color="black" />
          <Text>Complete: {completeCount}</Text>
        </View>
        <View style={[styles.total, { backgroundColor: "lightcoral" }]}>
          <AntDesign name="checkcircleo" size={24} color="black" />
          <Text>Incomplete: {incompleteCount}</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={todos}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.todoContainer,
                {
                  backgroundColor: item.completed ? "lightgreen" : "lightcoral",
                },
              ]}
            >
              <View>
                <CheckBox
                  value={item.completed}
                  onValueChange={() => toggleComplete(index)}
                  color={item.completed ? "black" : "grey"}
                  style={styles.checkBox}
                />
              </View>
              <View style={styles.todoTextContainer}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Text>{item.content}</Text>
              </View>
              <View style={styles.imageButtonContainer}>
                <TouchableOpacity onPress={() => deleteTodo(index)}>
                  <Feather name="trash-2" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    settodo(item);
                    setshowModal(true);
                  }}
                >
                  <Feather name="edit" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      {/* Modal edit todo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setshowModal(!showModal);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TextInput
              placeholder="Title"
              value={todo.title}
              onChangeText={(text) => settodo({ ...todo, title: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Content"
              value={todo.content}
              onChangeText={(text) => settodo({ ...todo, content: text })}
              style={styles.input}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Button
                title="Cancel"
                onPress={() => {
                  setshowModal(!showModal);
                }}
              />
              <Button title="Save" onPress={updateTodo} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
  },
  inputContainer: {
    width: 400,
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 350,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: 300,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 400,
    marginBottom: 20,
    marginTop: 20,
  },
  total: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
  },
  todoContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: 350,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "black",
  },
  checkBox: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    width: 20,
    height: 20,
  },
  todoTextContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  imageButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
});
