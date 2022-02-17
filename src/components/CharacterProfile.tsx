import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useGetCharacterDetailsQuery } from "../api/graphql.generated";

type CharacterProfileProps = NativeStackScreenProps<
  RootStackParamList,
  "Character"
>;

export const CharacterProfile: React.FC<CharacterProfileProps> = ({
  route,
  navigation,
}: CharacterProfileProps) => {
  const { character } = route.params;
  const { isFetching, error, data, isLoading } = useGetCharacterDetailsQuery({
    characterId: character.id,
  });

  console.log(character, data);

  if (error) return <Text>There has been an error</Text>;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        source={{ uri: character?.image }}
        fadeDuration={500}
        style={{
          width: 200,
          height: 200,
          marginBottom: 5,
          borderRadius: 10,
        }}
      />
      <Text>{character?.id}</Text>
      {isFetching || isLoading ? (
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
