// index.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useCharacters } from "../hooks/useCharacters";

type CharacterListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const CharacterList: React.FC<CharacterListProps> = ({ navigation }) => {
  const [page, setPage] = useState(3);
  const { isLoading, error, data } = useCharacters(page);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>There has been an error</Text>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        numColumns={3}
        contentContainerStyle={{
          width: Dimensions.get("window").width,
        }}
        keyExtractor={(item, index) => index.toString()}
        columnWrapperStyle={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
        data={data?.characters?.results}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("Character", { character: item })
              }
            >
              <Image
                source={{ uri: item.image }}
                fadeDuration={500}
                style={{
                  width: 90,
                  height: 90,
                  marginBottom: 5,
                  borderRadius: 50,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
