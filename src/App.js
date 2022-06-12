import "./App.css";
import Content, { Header, Footer } from "./components/Content";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import GameController from "./Redux/GameController";

function App() {
  const store = configureStore({
    reducer: {
      GameController,
    },
  });

  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    </Provider>
  );
}

export default App;
