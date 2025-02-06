import { View, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, IconName } from "@/types";

type ReportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "report"
>;

export default function ReportScreen() {
  const navigation = useNavigation<ReportScreenNavigationProp>();

  const options: {
    title: string;
    description: string;
    icon: IconName;
    onPress: () => void;
  }[] = [
    {
      title: "Report Status",
      description: "Check the status of your reported potholes.",
      icon: "document-text-outline" as IconName,
      onPress: () => {
        navigation.navigate("reportHistory");
      },
    },
    {
      title: "Register Report",
      description: "Submit a new pothole report.",
      icon: "create-outline" as IconName,
      onPress: () => {
        navigation.navigate("registerReport");
      },
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>
          📝 Report Pothole
        </ThemedText>
      </View>

      {/* Cards Container */}
      <View style={styles.cardContainer}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            activeOpacity={0.8}
            onPress={option.onPress}
          >
            <Ionicons name={option.icon} size={32} color="#2D8CFF" />
            <ThemedText type="title" style={styles.cardTitle}>
              {option.title}
            </ThemedText>
            <ThemedText style={styles.cardDesc}>
              {option.description}
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
    width: "90%",
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
