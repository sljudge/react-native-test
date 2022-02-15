// index.tsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useCharacterDetails } from "../hooks/useCharacterDetails";
import {
  useGetCharacterDetailsQuery,
  GetCharacterDetailsQuery,
  CharacterDetailsFragment,
} from "../generated/graphql";
import graphqlRequestClient from "../requests/graphqlRequestClient";

type CharacterProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Character"
>;

export const CharacterProfile: React.FC<CharacterProfileProps> = ({
  route,
  navigation,
}: CharacterProfileProps) => {
  const { character } = route.params;
  const { isFetching, error, data } = useGetCharacterDetailsQuery<
    GetCharacterDetailsQuery,
    Error
  >(
    graphqlRequestClient,
    { characterId: character.id },
    {
      initialData: { character },
      staleTime: 5 * 1000,
      initialDataUpdatedAt: Date.now() - 7000,
      onSuccess: () => {
        console.log(
          Date.now(),
          `Fetching character #${character.id} details succeed`
        );
      },
    }
  );

  if (error) return <Text>There has been an error</Text>;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{ uri: data.character?.image }}
        fadeDuration={500}
        style={{
          width: 200,
          height: 200,
          marginBottom: 5,
          borderRadius: 10,
        }}
      />
      <Text>{data.character?.id}</Text>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{data.character?.species}</Text>
          <Text>{data.character?.gender}</Text>
          <Text>{data.character?.origin?.name}</Text>
        </>
      )}
    </View>
  );
};
