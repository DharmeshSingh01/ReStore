import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useStoreContext } from "../../context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useAppDispatch } from "../store/confugureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {


  const [darkMode, setDarkMode] = useState(false);
  //const {setBasket}= useStoreContext();
  const dispatch= useAppDispatch()
  const [loading, setLoading] = useState(true)
/*
useEffect(()=>{
  const buyerId= getCookie("buyerId");
  if(buyerId){
    agent.Basket.get()
    .then(basket=> setBasket(basket))
    .catch(error=> console.log(error))
    .finally(()=> setLoading(false))
  }
  else{
    setLoading(false)
  }
},[setBasket])
*/

useEffect(()=>{
  const buyerId= getCookie("buyerId");
  if(buyerId){
    agent.Basket.get()
    .then(basket=>dispatch(setBasket( basket)))
    .catch(error=> console.log(error))
    .finally(()=> setLoading(false))
  }
  else{
    setLoading(false)
  }
},[dispatch])


  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  // function addProduct() {
  //   setProduct((prevState) => [
  //     ...prevState,
  //     { id: prevState.length + 2,price:101, name: "Product" + (prevState.length + 1) },
  //   ]);
  // }
if(loading) return <LoadingComponent message="Initialising app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        {/* <CataLog /> */}
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
