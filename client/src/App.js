import { Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import "./App.css";
import Home from "./components/Home";
import CreateForm from "./components/CreateForm";
import Detail from "./components/Detail";

function App() {
  return (
    <main className="App">
      <Route exact path={"/"}>
        <LandingPage />
      </Route>
      <Route path={"/home"}>
        <Home />
      </Route>
      <Route exact path={"/create"}>
        <CreateForm />
      </Route>
      <Route exact path={"/pokemon/:id"}>
        <Detail />
      </Route>
    </main>
  );
}

export default App;
