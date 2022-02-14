// index.tsx
import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useCharacterDetails } from "../hooks/useCharacterDetails";
import { CharacterDetailsFragment } from "../generated/graphql";

type CharacterProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Character"
>;

export const CharacterProfile: React.FC<CharacterProfileProps> = ({
  route,
  navigation,
}: CharacterProfileProps) => {
  const { character } = route.params;
  const { isLoading, error, data } = useCharacterDetails(character);

  const characterData: CharacterDetailsFragment = data ?? character;

  console.log({
    isLoading,
    error,
    characterData,
  });

  if (error) return <Text>There has been an error</Text>;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{ uri: characterData?.image }}
        fadeDuration={500}
        style={{
          width: 200,
          height: 200,
          marginBottom: 5,
          borderRadius: 10,
        }}
      />
      <Text>{characterData?.name}</Text>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text>{characterData?.id}</Text>
          <Text>{characterData?.species}</Text>
          <Text>{characterData?.gender}</Text>
          <Text>{characterData?.origin?.name}</Text>
        </>
      )}
    </View>
  );
};
