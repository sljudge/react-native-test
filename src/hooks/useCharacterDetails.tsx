import {
  CharacterFragment,
  useGetCharacterDetailsQuery,
} from "../generated/graphql";
import { useGraphQLClient } from "./useGraphQLClient";

export function useCharacterDetails(character: CharacterFragment) {
  const { graphQLClient } = useGraphQLClient();
  const id = character.id;

  const queryInfo = useGetCharacterDetailsQuery(
    graphQLClient,
    {
      characterId: id,
    },
    {
      staleTime: 0,
      initialData: { character },
      onSuccess: () => {
        console.log(Date.now(), `Fetching character #${id} details succeed`);
      },
    }
  );
  return {
    ...queryInfo,
    data: queryInfo.data?.character,
    refetch: queryInfo.refetch,
  };
}
