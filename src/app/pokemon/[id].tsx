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
  const [types, setTypes] = useState<string[]>([]);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [stats, setStats] = useState<any>({});

  useEffect(() => {
    const loadPokemon = async () => {
      const response = await api.get(`/pokemon/${name}`);
      setPokemon(response.data);

      const spesiesURL = response.data.species.url;
      const spesiesResponses = await api.get(spesiesURL);
      // Tipo do pokemon
      const pokemonTypes = response.data.types.map((t: any) => t.type.name);
      setTypes(pokemonTypes);
      // Habilidades
      const pokemonAbilities = response.data.abilities.map((a: any) => a.ability.name);
      setAbilities(pokemonAbilities);

      // Estatisticas principais
      const pokemonStats = response.data.stats.reduce((acc: any, s: any) => {
        acc[s.stat.name] = s.base_stat;
        return acc;
      }, {});
      setStats(pokemonStats);

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

      <View style={styles.containerAtv}>
        {/* TYPES */}
        <View style={styles.novosAtv}>
          <Text style={styles.titleAtv}>Tipos: </Text>
          {types.map((type, index) => (
            <Text key={index}>
              {type}
            </Text>
          ))}
        </View>

        {/* STATUS */}
        <View style={styles.novosAtv}>
          <Text style={styles.titleAtv}>Status: </Text>
          <Text>HP: {stats.hp}</Text>
          <Text>ATK: {stats.attack}</Text>
          <Text>DEF: {stats.defense}</Text>
        </View>

        {/* HABILIDADES */}
        <View style={styles.novosAtv}>
          <Text style={styles.titleAtv}>Habilidades: </Text>
          {pokemon.abilities.map((item: any, index: number) => (
            <Text key={index}>
              {item.ability.name}
            </Text>
          ))}
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
