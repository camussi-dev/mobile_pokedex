import { Image, Text, View } from "react-native";
import { styles } from "./style";

export default function Pokemon() {
  return (
    <View style={styles.container}>
      {/* CEBEÇALHO */}
      <View style={styles.header}>
        <Image
          style={{ width: 80 }}
          source={require("../assets/bulbasaur.png")}
        ></Image>
      </View>

      {/* INFORMAÇÕES: */}
      <Text style={styles.titulo}>Bulbasaur</Text>
      <View style={styles.infoPokemon}>
        <View style={styles.info}>
          <Text style={styles.infoDimensions}>6.9kg</Text>
          <Text>Peso</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.infoDimensions}>90cm</Text>
          <Text>Altura</Text>
        </View>
      </View>

      {/* EVOLUÇÕES: */}
      <Text style={styles.titulo}>Evoluções</Text>

      <View style={styles.footer}>
        <View style={styles.footerCardContainer}>
          <View style={styles.footerCard}>
            <Image source={require("../assets/bulbasaur.png")}></Image>
          </View>
          <Text>Bulbasaur</Text>
        </View>
        <View style={styles.footerCardContainer}>
          <View style={styles.footerCard}>
            <Image source={require("../assets/bulbasaur.png")}></Image>
          </View>
          <Text>Bulbasaur</Text>
        </View>
        <View style={styles.footerCardContainer}>
          <View style={styles.footerCard}>
            <Image source={require("../assets/bulbasaur.png")}></Image>
          </View>
          <Text>Bulbasaur</Text>
        </View>
      </View>
    </View>
  );
}
