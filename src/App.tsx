import "./App.css";
import "@radix-ui/themes/styles.css";
import { Theme, Flex } from "@radix-ui/themes";
import AppRoutes from "./router/routes.js";

function App() {
  return (
    <Theme accentColor="green" grayColor="sand" appearance="dark">
      <Flex align="center" justify="center" height="100vh">
        <AppRoutes />
      </Flex>
    </Theme>
  );
}

export default App;
