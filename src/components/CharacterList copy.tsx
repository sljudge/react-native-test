// index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useQueryClient } from "react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useCharacters } from "../hooks/useCharacters";
import { useGraphQLClient } from "../hooks/useGraphQLClient";
import { useGetAllCharactersQuery } from "../generated/graphql";
import graphqlRequestClient from "../requests/graphqlRequestClient";
import { GraphQLClientProvider } from "../providers/GraphQLClientProvider";

type CharacterListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const CharacterList: React.FC<CharacterListProps> = ({ navigation }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const { isLoading, error, data, numberOfPages, fetcher } =
    useCharacters(page);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>There has been an error</Text>;

  useEffect(() => {
    queryClient.prefetchQuery(["GetAllCharacters", page + 1], () =>
      useCharacters(page + 1)
    );
  }, [data, page, useCharacters]);

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
