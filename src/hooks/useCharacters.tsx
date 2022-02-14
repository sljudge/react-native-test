import { useGraphQLClient } from "./useGraphQLClient";
import { useGetAllCharactersQuery } from "../generated/graphql";

export function useCharacters(page = 0) {
  const { graphQLClient } = useGraphQLClient();
  const queryInfo = useGetAllCharactersQuery(
    graphQLClient,
    { page: page },
    { keepPreviousData: true }
  );
  return {
    ...queryInfo,
    characters: queryInfo.data?.characters?.results,
  };
}
