import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
//Navigations
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// You can import from local files
import LoginScreen from "./components/screens/Login";
import DashboardScreen from "./components/screens/Dashboard";
import RegisterScreen from "./components/screens/Register";
import SingleComputer from "./components/screens/SingleComputer";

import useAsyncStorage from "./components/services/useAsyncStorage";

import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from "react-native-paper";

const Stack = createNativeStackNavigator();
const theme = {
  ...DefaultTheme,
    colors: {
      "primary": "rgb(52, 61, 255)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(224, 224, 255)",
      "onPrimaryContainer": "rgb(0, 0, 110)",
      "secondary": "rgb(92, 93, 114)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(225, 224, 249)",
      "onSecondaryContainer": "rgb(25, 26, 44)",
      "tertiary": "rgb(120, 83, 107)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(255, 216, 238)",
      "onTertiaryContainer": "rgb(46, 17, 38)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(255, 251, 255)",
      "onBackground": "rgb(27, 27, 31)",
      "surface": "rgb(255, 251, 255)",
      "onSurface": "rgb(27, 27, 31)",
      "surfaceVariant": "rgb(228, 225, 236)",
      "onSurfaceVariant": "rgb(70, 70, 79)",
      "outline": "rgb(119, 118, 128)",
      "outlineVariant": "rgb(199, 197, 208)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(48, 48, 52)",
      "inverseOnSurface": "rgb(243, 239, 244)",
      "inversePrimary": "rgb(190, 194, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(245, 242, 255)",
        "level2": "rgb(239, 236, 255)",
        "level3": "rgb(233, 230, 255)",
        "level4": "rgb(231, 228, 255)",
        "level5": "rgb(227, 224, 255)"
      },
      "surfaceDisabled": "rgba(27, 27, 31, 0.12)",
      "onSurfaceDisabled": "rgba(27, 27, 31, 0.38)",
      "backdrop": "rgba(48, 48, 56, 0.4)"
    }
   // {jwtAuth}==null?'Login':'Dashboard'
};
//  
export default function App() {
  const [jwtAuth, updatejwtAuth, clearjwtAuth] = useAsyncStorage("@jwt:token");
  return (
   
    <>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={{jwtAuth}?'Login':'Dashboard'}>
          <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Dashboard", headerShown: false }}
            />
            <Stack.Screen
              name="SingleComputer"
              component={SingleComputer}
              options={({ route }) => ({ title: route.params.name, headerShown: true  })}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register", headerShown: false }}
            />
          
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </>
  );
}
AppRegistry.registerComponent('GZM', () => App);
