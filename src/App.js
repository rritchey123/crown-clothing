import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  onAuthStateChangeListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import Navigation from "./routes/Navigation/Navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./components/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      dispatch(setCurrentUser(user));
    });
    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
