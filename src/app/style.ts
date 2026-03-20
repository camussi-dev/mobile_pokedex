import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  info: {
    color: "#000",
    padding: 20,
  },
  inputContainer: {
    backgroundColor: "#f0f0f0",
    margin: 20,
    borderRadius: 4,
    flexDirection: "row",
    padding: 10,
    gap: 15,
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 15,
  },
  contentText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    elevation: 5,
    borderRadius: 4,
  },
  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 15,
  },
  buttonFooter: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
  },
  ButtonText: {
    color: "#000",
  },
});
