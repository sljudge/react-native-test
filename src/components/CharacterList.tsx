// index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import { useQueryClient } from "react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  useGetAllCharactersQuery,
  GetAllCharactersQuery,
  useGetCharacterDetailsQuery,
} from "../generated/graphql";
import graphqlRequestClient from "../requests/graphqlRequestClient";

type CharacterListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const CharacterList: React.FC<CharacterListProps> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();
  const { isLoading, error, data, isPreviousData, isFetching } =
    useGetAllCharactersQuery<GetAllCharactersQuery, Error>(
      graphqlRequestClient,
      { page: page },
      { keepPreviousData: true, staleTime: 60 * 1000 }
    );

  if (error) return <Text>There has been an error</Text>;

  const isBusy = isLoading || isFetching;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
      }}
    >
      {isBusy ? (
        <Text>Loading...</Text>
      ) : (
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
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 30,
        }}
      >
        <Button
          title="Previous"
          onPress={() => {
            if (!isPreviousData && page > 0) {
              setPage((old) => old - 1);
            }
          }}
          disabled={!isBusy && page === 1}
        />
        <Button
          title="Next"
          onPress={() => {
            setPage(page + 1);
          }}
          disabled={!isBusy && isPreviousData}
        />
        <Button
          title="Prefetch"
          onPress={async () => {
            await queryClient.fetchQuery(
              useGetAllCharactersQuery.getKey({ page: page + 1 }),
              useGetAllCharactersQuery.fetcher(graphqlRequestClient, {
                page: page + 1,
              })
            );
          }}
        />
      </View>
    </View>
  );
};
