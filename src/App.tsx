import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { store } from "./store";
import { theme } from "ui";

import { CharactersPage } from "pages/Characters";
import { CharacterPage } from "pages/Character";
import { UsersPage } from "pages/Users";
import { UserPage } from "pages/User";

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <UsersPage />
            </Route>
            <Route exact path="/characters">
              <CharactersPage />
            </Route>
            <Route exact path="/characters/:characterId">
              <CharacterPage />
            </Route>
            <Route exact path="/users">
              <UsersPage />
            </Route>
            <Route exact path="/users/:userId">
              <UserPage />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
