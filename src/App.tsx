import Sidebar from "./components/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Category from "./components/Category/Category";
import CtrlForm from "./components/Ctrl/CtrlForm";
import Home from "./components/Home/Home";
import Overlay from "./components/UI/Overlay/Overlay";
import Header from "./components/Header/Header";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <Header />
      <div className={styles.container}>
        <Sidebar />
        <Switch>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/add">
            <CtrlForm />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
      <Overlay />
    </Router>
  );
}

export default App;
