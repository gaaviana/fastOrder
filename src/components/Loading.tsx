import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color="#FF9800" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
