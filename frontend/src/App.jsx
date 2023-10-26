import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./App.css";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MultiSelectTheme } from "chakra-multiselect";
import ContextConnected from "./config/ContextConnected";
import { useState } from "react";

function App() {
  const theme = extendTheme({
    components: {
      MultiSelect: MultiSelectTheme,
    },
  });

  const [books,setBooks] = useState([])
    const [authors,setAuthors] = useState([])
    const [popupMode , setPopupMode] = useState(false)
  return (
    <ContextConnected.Provider value={{
      books , 
      setBooks ,
      authors , 
      setAuthors ,
      popupMode , 
      setPopupMode
    }}>
      <ChakraProvider theme={theme}>
        <Home></Home>
        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          theme="dark"
        />
      </ChakraProvider>
    </ContextConnected.Provider>
  );
}

export default App;
