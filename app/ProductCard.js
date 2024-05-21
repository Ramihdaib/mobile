import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
}) {
  const baseURL = "http://172.16.17.154:3000";
  const fullImagePath = `${baseURL}${imagePath}`;
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: fullImagePath }} style={styles.image} />
      </View>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{name}</Text>
        <Text style={styles.cardDescription}>
          {formatCurrency(priceInCents / 100)}
        </Text>
      </View>
      <View style={styles.cardContent}>
        <Text numberOfLines={4} style={styles.description}>
          {description}
        </Text>
      </View>
      <View style={styles.cardFooter}>
        <Link href="purchase" style={styles.button}>
          <TouchableOpacity>
            <Text style={styles.buttonText}>Purchase</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

export function ProductCardSkeleton() {
  return (
    <View style={[styles.card, styles.skeletonCard]}>
      <View style={styles.skeletonImage} />
      <View style={styles.cardHeader}>
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonDescription} />
      </View>
      <View style={styles.cardContent}>
        <View style={styles.skeletonText} />
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonText, styles.skeletonShortText]} />
      </View>
      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.button, styles.skeletonButton]}
          disabled
        >
          <ActivityIndicator color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function handlePurchase(id) {
  // Implement the purchase logic, possibly navigation to a new screen
  console.log(`Purchased product with id: ${id}`);
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    margin: 8,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    overflow: "hidden",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cardHeader: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 16,
    color: "#666",
  },
  cardContent: {
    paddingHorizontal: 16,
    flex: 1,
  },
  description: {
    fontSize: 14,
    color: "#333",
  },
  cardFooter: {
    padding: 16,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  skeletonCard: {
    backgroundColor: "#f0f0f0",
  },
  skeletonImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#ccc",
  },
  skeletonTitle: {
    width: "75%",
    height: 20,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginVertical: 8,
  },
  skeletonDescription: {
    width: "50%",
    height: 16,
    backgroundColor: "#ccc",
    borderRadius: 4,
  },
  skeletonText: {
    width: "100%",
    height: 14,
    backgroundColor: "#ccc",
    borderRadius: 4,
    marginVertical: 4,
  },
  skeletonShortText: {
    width: "75%",
  },
  skeletonButton: {
    backgroundColor: "#bbb",
  },
});
