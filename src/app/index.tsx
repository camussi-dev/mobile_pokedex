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
import { PokemonListItem } from "./types/pokemon";
import { useEffect, useState } from "react";
import { fetchPokemons } from "./services/api";
import Modal from "react-native-modal";
import Pokemon from "./pokemon/[id]";

export default function Index() {
  // Uso de estado:
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  const toggleModal = (pokemonName?: string) => {
    if (pokemonName) {
      setSelectedPokemon(pokemonName);
    }
    setModalVisible(!isModalVisible);
  };

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
            <Pressable
              onPress={() => toggleModal(item.name)}
              style={styles.card}
            >
              <View style={styles.cardInfo}>
                <Image
                  width={60}
                  height={60}
                  source={{ uri: item.image }}
                ></Image>
                <View>
                  <Text>#{index + 1}</Text>
                  <Text>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Text>
                </View>
              </View>
              <Ionicons name="chevron-forward-outline" size={32}></Ionicons>
            </Pressable>
          )}
        ></FlatList>
      </View>

      {/* BOTÃO */}
      <View style={styles.footer}>
        <Pressable style={styles.buttonFooter}>
          <Text style={styles.ButtonText}> Conhecer Pokemon</Text>
        </Pressable>
      </View>

      {/* MODAL */}
      <Modal
        isVisible={isModalVisible}
        onBackButtonPress={() => toggleModal}
        swipeDirection={"down"}
        onSwipeComplete={() => toggleModal}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Pokemon name={selectedPokemon}></Pokemon>
        </View>
      </Modal>
    </View>
  );
}