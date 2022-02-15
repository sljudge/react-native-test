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
  ScrollView,
} from "react-native";
import { useQueryClient } from "react-query";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import {
  useGetAllCharactersQuery,
  GetAllCharactersQuery,
  useGetCharacterDetailsQuery,
  useInfiniteGetAllCharactersQuery,
  Character,
  CharacterFragment,
} from "../generated/graphql";
import graphqlRequestClient from "../requests/graphqlRequestClient";

type CharacterListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const CharacterList: React.FC<CharacterListProps> = ({ navigation }) => {
  const [page, setPage] = useState(5);
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteGetAllCharactersQuery<GetAllCharactersQuery, Error>(
    "page",
    graphqlRequestClient,
    {},
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage, pages) => ({
        page: lastPage?.characters?.info.next,
      }),
    }
  );

  if (error) return <Text>There has been an error</Text>;
  if (isLoading) return <Text>Loading...</Text>;

  console.log({
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  });
  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: 30,
      }}
    >
      {data?.pages?.map((page, i) => (
        <React.Fragment key={i}>
          {page.characters?.results?.map((character) => (
            <View
              key={character.id}
              style={{
                margin: 10,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("Character", { character })}
              >
                <Image
                  source={{ uri: character.image }}
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
          ))}
        </React.Fragment>
      ))}
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
          title={
            isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "Nothing more to load"
          }
          onPress={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        />
      </View>
    </ScrollView>
  );
};
