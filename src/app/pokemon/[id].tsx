import { Image, View } from "react-native";
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
    </View>
  );
}
