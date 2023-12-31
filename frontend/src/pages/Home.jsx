import { Flex } from "@chakra-ui/react";
import { Navbar } from "../components/navbar/Navbar";
import { BookPanel } from "../components/bookPanel/BookPanel";
import { AuthorPanel } from "../components/bookPanel/optionsMenu/AuthorPanel";
import { useContext, useEffect, useState } from "react";
import api from "../config/api";
import { ChartsPanel } from "../components/chartsPanel/ChartsPanel";
import ContextConnected from "../config/ContextConnected";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const Connected = useContext(ContextConnected);

  useEffect(() => {
    getBooks();
    getAuthors();
  }, []);

  const getBooks = async () => {
    const res = await api.get("/book/");
    setBooks(res.data.data);
    Connected.setBooks(res.data.data)
  };

  const getAuthors = async () => {
    const res = await api.get("/author/");
    setAuthors(res.data.data);
    Connected.setAuthors(res.data.data)
  };

  return (
    <Flex direction="column" bg="#F1F1F1" h="100%">
      <Navbar></Navbar>
      <Flex>
        {
            books && <BookPanel authors={authors} books={books} />
        }

        <AuthorPanel authors={authors} />
      </Flex>
      {
       books.length > 0 && <ChartsPanel books={books}/>
      }
    </Flex>
  );
};
