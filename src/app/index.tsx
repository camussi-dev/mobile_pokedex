import { Text, TextInput, View } from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  return (
    <View style={styles.container}>
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <Text style={styles.logo}>Pokédex</Text>
        <Ionicons name="settings-outline" size={32}></Ionicons>
      </View>

      <Text style={styles.info}>
        Encontre seu pokémon pesquisando pelo nome ou por código pokémon
      </Text>

      {/* INPUT */}
      <View>
        <Ionicons name="search" size={32}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          placeholderTextColor="#000"
        ></TextInput>
      </View>
    </View>
  );
}
