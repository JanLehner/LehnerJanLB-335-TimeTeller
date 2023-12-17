import { View, Text, Pressable } from "react-native";
import { Link } from "expo-router";
import { styles } from "../stylesheets/style";

const TabbarList = () => {
  return (
    <View style={{ ...styles.flexbox, ...styles.tabbar }}>
      <Link href="/" asChild>
        <Pressable style={{ ...styles.flexbox, ...styles.tabbarBtnN, ...styles.tabbarBtnP }}>
          <Text style={styles.tabbarBtnText}>Location</Text>
        </Pressable>
      </Link>
      <Pressable style={{ ...styles.flexbox, ...styles.tabbarBtnN, ...styles.tabbarBtnA }}>
        <Text style={styles.tabbarBtnText}>List</Text>
      </Pressable>
    </View>
  );
}

export default TabbarList;