import { Button, Flex, Text } from "@chakra-ui/react"
import { BookCard } from "./bookCard/BookCard";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";
import { BookPopup } from "./bookPopup/BookPopup";


export const BookPanel = ({ books , authors}) => {

  const [deleteMode , setDeleteMode] = useState(false)
  const [saveMode , setSaveMode] = useState(false)
  const [updateMode , setUpdateMode] = useState(false)

  const deleteModeHandler = () => {
    if (deleteMode) {
      setDeleteMode(false)
    } else {
      setDeleteMode(true)
    }
  }

  const saveBook = () => {
    if (saveMode) {
      setSaveMode(false)
    } else {
      setSaveMode(true)
    }
  }

  const updateBook = () => {
    if (updateMode) {
      setUpdateMode(false)
    } else {
      setUpdateMode(true)
    }
  }

    return (
      <Flex direction="column" bg="#1C4E80"  h="20em" w="60%" borderRadius="10px"   mt="4em" ml="6em" alignItems="flex-start">
        <Text ml="3em" color="white" fontSize="2em">Books</Text>
        <Flex ml="3em" borderRadius="10px" bg="white" w="90%">
          {
            saveMode && <BookPopup authors={authors} setSaveMode={setSaveMode}/>
          }
          {
              books.map((book) => (
                  <BookCard authors={authors} updateMode={updateMode} setUpdateMode={setUpdateMode} deleteMode={deleteMode} setDeleteMode={setDeleteMode} details={book} key={book.id}/>
              ))
          }
        </Flex>
        <Flex alignSelf="flex-end"   w="20em">
          <Button m=".8em" onClick={saveBook}>Agregar</Button>
          <Button m=".8em" onClick={updateBook}>Editar</Button>
          <Button  m=".8em" onClick={deleteModeHandler}>Eliminar</Button>
        </Flex>
      </Flex>
    );
  };