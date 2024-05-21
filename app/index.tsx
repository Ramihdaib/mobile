import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet, StatusBar } from "react-native";
import { ProductCard, ProductCardSkeleton } from "./ProductCard";

interface Data {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
}

export default function Index() {
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://172.16.17.154:3000/api");
        if (!response.ok) {
          throw new Error(
            "Network response was not ok: " + response.statusText
          );
        }
        const json: Data[] = await response.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <StatusBar />
      {loading ? (
        <FlatList
          data={[...Array(5).keys()]}
          renderItem={() => <ProductCardSkeleton />}
          keyExtractor={(item) => item.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ProductCard
              id={item.id}
              name={item.name}
              priceInCents={item.priceInCents}
              description={item.description}
              imagePath={item.imagePath}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
  },
  listContent: {
    padding: 16,
  },
});
