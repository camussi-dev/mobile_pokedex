import { Image, Pressable, Text, TextInput, View } from "react-native";
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
      <View style={styles.inputContainer}>
        <Ionicons name="search" size={32}></Ionicons>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          placeholderTextColor="#000"
        ></TextInput>
      </View>

      {/* CONTEÚDO */}
      <View style={styles.content}>
        <Text style={styles.contentText}>Todos os pokemons</Text>
        <View style={styles.card}>
          <View style={styles.cardInfo}>
            <Image source={require("./assets/bulbasaur.png")}></Image>
            <View>
              <Text>#001</Text>
              <Text>Bulbasaur</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={32}></Ionicons>
        </View>
      </View>

      {/* BOTÃO */}
      <View style={styles.footer}>
        <Pressable style={styles.buttonFooter}>
          <Text style={styles.ButtonText}> Conhecer Pokemon</Text>
        </Pressable>
      </View>
    </View>
  );
}
