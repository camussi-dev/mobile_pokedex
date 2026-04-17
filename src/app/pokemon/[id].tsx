import { Image, Text, View } from "react-native";
import { styles } from "./style";
import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Props {
  name?: string | null;
}
interface Evolution {
  name: string;
  image: string;
}

export default function Pokemon({ name }: Props) {
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolution, setEvolution] = useState<Evolution[]>([]);

  useEffect(() => {
    const loadPokemon = async () => {
      const response = await api.get(`/pokemon/${name}`);
      setPokemon(response.data);
      const spesiesURL = response.data.species.url;
      const spesiesResponses = await api.get(spesiesURL);
      const evolutionsURL = spesiesResponses.data.evolution_chain.url;
      const evolutionResponse = await api.get(evolutionsURL);
      const evolution = extractEvolutions(evolutionResponse.data.chain);
      const evolutionImages = await Promise.all(
        evolution.map(async (evoName) => {
          const response = await api.get(`/pokemon/${evoName}`);
          return {
            name: evoName,
            image: response.data.sprites.other.showdown.front_default,
          };
        }),
      );
      setEvolution(evolutionImages);
    };
    loadPokemon();
  }, [name]);

  const extractEvolutions = (chain: any): string[] => {
    const evolutions: string[] = [];
    let current = chain;
    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0];
    }
    return evolutions;
  };

  if (!pokemon) {
    return <Text>Carregando informações...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* CEBEÇALHO */}
      <View style={styles.header}>
        <Image
          style={{ width: 100, height: 100 }}
          source={{ uri: pokemon.sprites.other.showdown.front_default }}
        ></Image>
      </View>

      {/* INFORMAÇÕES: */}
      <Text style={styles.titulo}>{name}</Text>
      <View style={styles.infoPokemon}>
        <View style={styles.info}>
          <Text style={styles.infoDimensions}>{pokemon.weight / 10}kg</Text>
          <Text>Peso</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoDimensions}>{pokemon.height / 10}m</Text>
          <Text>Altura</Text>
        </View>
      </View>

      {/* EVOLUÇÕES: */}
      <Text style={styles.titulo}>Evoluções</Text>

      <View style={styles.footer}>
        {evolution.map((evo, index) => (
          <View key={index} style={styles.footerCardContainer}>
            <View style={styles.footerCard}>
              <Image
                style={{ width: 60, height: 60 }}
                source={{ uri: evo.image }}
              ></Image>
            </View>
            <Text>{evo.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
