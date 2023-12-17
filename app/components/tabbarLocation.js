import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { styles } from "../stylesheets/style";

const TabbarLocation = () => {
  return (
    <View style={{ ...styles.flexbox, ...styles.tabbar }}>
      <Pressable style={{ ...styles.flexbox, ...styles.tabbarBtnN, ...styles.tabbarBtnA }}>
        <Text style={styles.tabbarBtnText}>Location</Text>
      </Pressable>
      <Link href="/listscreen" asChild>
        <Pressable style={{ ...styles.flexbox, ...styles.tabbarBtnN, ...styles.tabbarBtnP }}>
          <Text style={styles.tabbarBtnText}>List</Text>
        </Pressable>
      </Link>
    </View>
  );
}

export default TabbarLocation;