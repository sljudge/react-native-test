import "react-native-gesture-handler";
import { StyleSheet, StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { GraphQLClientProvider } from "./src/providers/GraphQLClientProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CharacterProfile } from "./src/components/CharacterProfile";
import { CharacterList } from "./src/components/CharacterList";
import { CharacterFragment } from "./src/generated/graphql";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

export type RootStackParamList = {
  Home: undefined;
  Character: { character: CharacterFragment };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent />
      <GraphQLClientProvider>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={CharacterList} />
            <Stack.Screen name="Character" component={CharacterProfile} />
          </Stack.Navigator>
        </QueryClientProvider>
      </GraphQLClientProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  nav: {
    backgroundColor: "#1E1E1E",
    color: "#EFEFEF",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  navItem: {
    color: "#EFEFEF",
  },
});
