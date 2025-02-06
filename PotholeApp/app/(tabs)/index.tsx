import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { IconName, RootStackParamList } from "@/types";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const features: {
    title: string;
    description: string;
    icon: IconName;
    onPress: () => void;
  }[] = [
    {
      title: "Community",
      description: "Join the community to report potholes.",
      icon: "people-outline" as IconName,
      onPress: () => {},
    },
    {
      title: "Nearby Potholes",
      description: "View potholes near your location.",
      icon: "location-outline" as IconName,
      onPress: () => {},
    },
    {
      title: "Report Pothole",
      description: "Upload a new pothole location.",
      icon: "camera-outline" as IconName,
      onPress: () => {},
    },
    {
      title: "Statistics",
      description: "View reported pothole data.",
      icon: "bar-chart-outline" as IconName,
      onPress: () => {},
    },
    {
      title: "Login",
      description: "Access your account.",
      icon: "log-in-outline" as IconName,
      onPress: () => {
        navigation.navigate("login");
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          🚧 Pothole Tracker
        </ThemedText>
      </View>

      {/* Cards Container */}
      <View style={styles.cardContainer}>
        {features.map((feature, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={feature.onPress}
          >
            <Ionicons name={feature.icon} size={32} color="#2D8CFF" />
            <ThemedText type="title" style={styles.cardTitle}>
              {feature.title}
            </ThemedText>
            <ThemedText style={styles.cardDesc}>
              {feature.description}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4F8",
  },
  header: {
    backgroundColor: "#fff",
    paddingTop: 35,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 10,
  },
  card: {
    width: "45%", // Two cards per row
    height: 140,
    padding: 16,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },
  cardDesc: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 4,
    color: "#666",
  },
});
