import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import Details from "../pages/Details";

const Stack = createNativeStackNavigator();

function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          headerShown: false,
          title: "Detalhes",
        }}
      />
    </Stack.Navigator>
  );
}

export default StackRoutes;
