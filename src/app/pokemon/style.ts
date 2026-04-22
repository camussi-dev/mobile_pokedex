import { Header } from "@react-navigation/elements";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  header: {
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
    borderRadius: 5,
  },
  titulo: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: "bold",
  },
  infoPokemon: {
    flexDirection: "row",
    gap: 15,
  },
  info: {
    padding: 25,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "#f2f2f2",
    justifyContent: "center",
    alignItems: "center",
  },
  infoDimensions: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerCardContainer: {
    width: 88,
    height: 88,
  },
  footerCard: {
    backgroundColor: "#f6f6f6",
    padding: 15,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 4,
  },
  containerAtv: {
    display: "flex",
    flexDirection: "row",
    gap: 20
  },
  titleAtv:{
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 10
  },
  novosAtv:{
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 6,
    padding: 20
  }
});
