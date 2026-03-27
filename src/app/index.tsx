import {
  FlatList,
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { styles } from "./style";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { PokemonListItem } from "./types/pokemon";
import { useEffect, useState } from "react";
import { fetchPokemons } from "./services/api";

export default function Index() {
  // Uso de estado:
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);

  // Executar componente
  useEffect(() => {
    const loadPokemons = async () => {
      // Busca lista de pokemons
      const data = await fetchPokemons();
      const fetchPokemonsData: PokemonListItem[] = await Promise.all(
        data.map(async (item: { name: string; url: string }) => {
          const response = await fetch(item.url);
          const details = await response.json();
          return {
            name: item.name,
            image: details.sprites.front_default,
          };
        }),
      );
      setPokemons(fetchPokemonsData);
    };
    loadPokemons();
  });

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

        <FlatList
          data={pokemons}
          keyExtractor={(item) => item.name}
          renderItem={({ item, index }) => (
            <View style={styles.card}>
              <View style={styles.cardInfo}>
                <Image width={60} height={60} source={{uri: item.image}}></Image>
                <View>
                  <Text>#{index + 1}</Text>
                  <Text>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                </View>
              </View>
              <Link
                href={{
                  pathname: "/pokemon/[id]",
                  params: {
                    id: "name",
                  },
                }}
              >
                <Ionicons name="chevron-forward-outline" size={32}></Ionicons>
              </Link>
            </View>
          )}
        ></FlatList>
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
