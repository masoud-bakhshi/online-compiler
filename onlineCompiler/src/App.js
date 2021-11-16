import "./styles.css";
import ThemeProvider from "./Material/PrimaryColor";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>{/* <Route path="/" component={Magazine} exact /> */}</Switch>
    </BrowserRouter>
  );
}
