import { Flex, Image, Text } from "@chakra-ui/react";
import bookLogo from "../../../assets/book.png";
import { CloseIcon, EditIcon } from "@chakra-ui/icons";
import { useContext, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { BookPopup } from "../bookPopup/BookPopup";
import ContextConnected from "../../../config/ContextConnected";

export const BookCard = ({
  authors,
  updateMode,
  setUpdateMode,
  deleteMode,
  setDeleteMode,
  details,
}) => {
  const Connected = useContext(ContextConnected);

  const openUpdatePopupHandler = () => {
    if (Connected.updateMode) {
      Connected.setUpdateMode(false);
    } else {
      Connected.setEditedCard(details);
      Connected.setUpdateMode(true);
    }
  };
  const deleteBookFromState = (bookId) => {
    Connected.setBooks((prevBooks) => {
      // Filtra los libros para excluir el que tiene el ID igual a 'bookId'
      return prevBooks.filter((book) => book.id !== bookId);
    });
  };
  const deleteBook = async () => {
    try {
      const res = await api.delete("/book/" + details.id);
  
      // Una vez que la eliminación en la API tiene éxito, procede con la eliminación en el estado local.
      deleteBookFromState(details.id);
      
      toast.success("Eliminado con éxito!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    } catch (e) {
      toast.error(e, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  return (
    <Flex
      direction="column"
      position="relative"
      borderRadius="30px"
      cursor="pointer"
      bg="white"
      border="1px solid black"
      w="10em"
      _hover={{ h: "85%", w: "11em", transition: ".5s" }}
      alignItems="center"
      h="80%"
      justifyItems="center"
      m="1em"
    >
      {deleteMode && (
        <CloseIcon
          position="absolute"
          top="10px"
          left="10px"
          onClick={deleteBook}
        />
      )}
      {updateMode && (
        <EditIcon
          position="absolute"
          top="10px"
          left="10px"
          onClick={openUpdatePopupHandler}
        />
      )}

      <Image mt="1em" h="4em" src={bookLogo} />
      <Text textAlign="center" color="black" fontSize="1em">
        {" "}
        {details.titulo}{" "}
      </Text>
      <p>{details.fechaPublicacion}</p>
      <Text fontSize=".8em" color="grey" key={authors[0].id}>
        {`${details.authors[0].nombre} ${details.authors[0].apellido}`}
        {details.authors.length > 1 && (
          <span>{` + ${details.authors.length - 1}`}</span>
        )}
      </Text>
    </Flex>
  );
};
