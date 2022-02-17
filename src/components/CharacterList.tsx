// index.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";
import { useGetAllCharactersQuery } from "../api/graphql.generated";

type CharacterListProps = NativeStackScreenProps<RootStackParamList, "Home">;

export const CharacterList: React.FC<CharacterListProps> = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const { isLoading, error, data, isFetching } = useGetAllCharactersQuery(
    { page: page },
    { refetchOnFocus: true }
  );

  if (error) return <Text>There has been an error</Text>;
  if (isLoading) return <Text>Loading...</Text>;

  return (
    <ScrollView
      contentContainerStyle={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: 30,
      }}
    >
      {data?.characters?.results.map((character, i) => (
        <React.Fragment key={i}>
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
        </React.Fragment>
      ))}
    </ScrollView>
  );
};
