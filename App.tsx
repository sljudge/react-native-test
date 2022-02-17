// import "react-native-gesture-handler";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";

import { store } from "./src/config/store";
import { CharacterProfile } from "./src/components/CharacterProfile";
import { CharacterList } from "./src/components/CharacterList";
import { CharacterFragment } from "./src/api/graphql.generated";

export type RootStackParamList = {
  Home: undefined;
  Character: { character: CharacterFragment };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar translucent />
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={CharacterList} />
          <Stack.Screen
            name="Character"
            component={CharacterProfile}
            options={({ route }) => ({ title: route.params.character?.name })}
          />
        </Stack.Navigator>
        {/* <ReactQueryDevtools initialIsOpen /> */}
      </Provider>
    </NavigationContainer>
  );
}
