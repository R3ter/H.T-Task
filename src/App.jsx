import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import EditMap from "./pages/EditMap/EditMap";

export default function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <EditMap />
      </ChakraProvider>
    </div>
  );
}
