import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import EditMap from "./pages/EditMap/EditMap";

export default function App() {
  return (
    <ChakraProvider>
      <EditMap />
    </ChakraProvider>
  );
}
