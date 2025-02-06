import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons"; // For info icon

interface Report {
  id: string;
  name: string;
  description: string;
  photo?: string | null;
  location: {
    latitude: number;
    longitude: number;
  };
  status: "Approved" | "Pending";
}

// Dummy Reports Data (Replace with API Call)
const dummyReports: Report[] = [
  {
    id: "1",
    name: "Pothole on Street",
    description: "Large pothole causing traffic issues.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/3/3a/Pothole_in_a_road.jpg",
    location: { latitude: 37.7749, longitude: -122.4194 },
    status: "Pending",
  },
  {
    id: "2",
    name: "Broken Streetlight",
    description: "Streetlight near park is not working.",
    photo: null,
    location: { latitude: 37.7755, longitude: -122.4195 },
    status: "Approved",
  },
  {
    id: "3",
    name: "Garbage Dump",
    description: "Uncollected garbage on main road.",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/9/98/Garbage_Dump.jpg",
    location: { latitude: 37.776, longitude: -122.4196 },
    status: "Pending",
  },
];

export default function ReportStatusScreen() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Simulate fetching reports
  useEffect(() => {
    setTimeout(() => {
      setReports(dummyReports);
      setLoading(false);
    }, 1500);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Fetching Reports...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Reports</Text>

      {reports.length === 0 ? (
        <Text style={styles.noReportsText}>No reports found.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.reportCard}>
              <View style={styles.reportHeader}>
                <Text style={styles.reportTitle}>{item.name}</Text>
                <TouchableOpacity onPress={() => setSelectedReport(item)}>
                  <FontAwesome name="info-circle" size={22} color="blue" />
                </TouchableOpacity>
              </View>
              <Text style={styles.reportDescription}>{item.description}</Text>
              <Text
                style={[
                  styles.reportStatus,
                  { color: item.status === "Approved" ? "green" : "red" },
                ]}
              >
                Status: {item.status}
              </Text>

              {/* Mini Map for Each Report */}
              <MapView
                style={styles.miniMap}
                initialRegion={{
                  latitude: item.location.latitude,
                  longitude: item.location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={item.location}
                  title={item.name}
                  pinColor="red"
                />
              </MapView>
            </View>
          )}
        />
      )}

      {/* Report Details Modal */}
      <Modal
        visible={!!selectedReport}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedReport(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedReport?.name}</Text>
            <Text style={styles.modalDescription}>
              {selectedReport?.description}
            </Text>
            <Text style={styles.modalStatus}>
              Status:{" "}
              <Text
                style={{
                  color:
                    selectedReport?.status === "Approved" ? "green" : "red",
                }}
              >
                {selectedReport?.status}
              </Text>
            </Text>
            {selectedReport?.photo && (
              <Image
                source={{ uri: selectedReport.photo }}
                style={styles.modalImage}
              />
            )}
            <Text style={styles.modalLocation}>
              📍 {selectedReport?.location.latitude},{" "}
              {selectedReport?.location.longitude}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedReport(null)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  noReportsText: { fontSize: 16, textAlign: "center", marginTop: 20 },

  reportCard: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  reportHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  reportTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  reportDescription: { fontSize: 14, color: "#555", marginTop: 5 },
  reportStatus: { fontSize: 14, fontWeight: "bold", marginTop: 5 },

  // Mini Map
  miniMap: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  modalDescription: { fontSize: 14, color: "#555", textAlign: "center" },
  modalStatus: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  modalImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginVertical: 10,
  },
  modalLocation: { fontSize: 14, color: "#777", textAlign: "center" },
  closeButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: { color: "white", fontWeight: "bold" },
});
