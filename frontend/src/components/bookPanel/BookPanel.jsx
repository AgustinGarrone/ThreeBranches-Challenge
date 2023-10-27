import { Button, Flex, Text } from "@chakra-ui/react";
import { BookCard } from "./bookCard/BookCard";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";
import { BookPopup } from "./bookPopup/BookPopup";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@splidejs/react-splide/css/core";
import Slider from "react-slick";
import { Swiper, SwiperSlide } from "swiper/react";
import ContextConnected from "../../config/ContextConnected";


export const BookPanel = ({ books, authors }) => {
  const Connected = useContext(ContextConnected);

  const [deleteMode, setDeleteMode] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 4
  };
  useEffect(() => {
  } , [Connected.books ])

  const deleteModeHandler = () => {
    if (deleteMode) {
      setDeleteMode(false);
    } else {
      setUpdateMode(false)
      setDeleteMode(true);
    }
  };

  const saveBook = () => {
    if (saveMode) {
      setSaveMode(false);
    } else {
      setSaveMode(true);
    }
  };

  const updateBook = () => {
    if (updateMode) {
      setUpdateMode(false)
    } else {
      setDeleteMode(false);
      setUpdateMode(true);
    }
  };

  return (
    <Flex
      direction="column"
      bg="#1C4E80"
      h="20em"
      w="60%"
      borderRadius="10px"
      mt="4em"
      ml="6em"
      alignItems="flex-start"
    >
      <Text ml="3em" color="white" fontSize="2em">
        Books
      </Text>
      <Flex ml="3em" borderRadius="10px" bg="white" w="90%">
        {saveMode && <BookPopup authors={authors} setSaveMode={setSaveMode} />}
        {Connected.updateMode && (
          <BookPopup authors={authors} editValues={Connected.editedCard} />
        )}
        <Splide
        options={{
          width:"100%",
          gap: "6em",
          drag: "free",
          arrows: false,
          pagination: false,
          perPage:5,
          rewind:false
        }}
      
      >
          {Connected.books.map((book) => (
                  <SplideSlide  >
              <BookCard
                authors={authors}
                updateMode={updateMode}
                setUpdateMode={setUpdateMode}
                deleteMode={deleteMode}
                setDeleteMode={setDeleteMode}
                details={book}
              />
              </SplideSlide>
          ))}
        </Splide>
      </Flex>

      <Flex alignSelf="flex-end" w="20em">
        <Button m=".8em" onClick={saveBook}>
          Agregar
        </Button>
        <Button m=".8em" onClick={updateBook}>
          Editar
        </Button>
        <Button m=".8em" onClick={deleteModeHandler}>
          Eliminar
        </Button>
      </Flex>
    </Flex>
  );
};
