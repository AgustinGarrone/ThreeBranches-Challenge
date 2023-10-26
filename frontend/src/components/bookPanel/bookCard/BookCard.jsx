import { Flex, Image, Text } from "@chakra-ui/react"
import bookLogo from "../../../assets/book.png"
import { CloseIcon, EditIcon } from "@chakra-ui/icons"
import { useContext, useState } from "react"
import api from "../../../config/api"
import { toast } from "react-toastify"
import { BookPopup } from "../bookPopup/BookPopup"
import ContextConnected from "../../../config/ContextConnected"

export const BookCard = ({ authors ,updateMode, setUpdateMode ,  deleteMode , setDeleteMode , details}) => {

    const Connected = useContext(ContextConnected)

    const openUpdatePopupHandler = () => {
        if (Connected.updateMode) {
            Connected.setUpdateMode(false)
        } else {
            Connected.setEditedCard(details)
            Connected.setUpdateMode(true)
        }
    }

    const deleteBook = () => {
        try {
            const res = api.delete("/book/" + details.id)
            Connected.setBooks(res.data.data)
            toast.success("🦄 Agregado con éxito!", {
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
    }

    return <Flex direction="column" position="relative" borderRadius="30px" cursor="pointer" bg="white" border="1px solid black" w="10em" _hover={{h:"85%" , w:"11em" , transition:".5s"}} alignItems="center" h="80%" justifyItems="center" m="1em">
        {
            deleteMode && <CloseIcon position="absolute" top="10px" left="10px" onClick={deleteBook}/>
        }
        {
            updateMode && <EditIcon position="absolute" top="10px" left="10px" onClick={openUpdatePopupHandler}/>
        }

        <Image mt="1em" h="7em" src={bookLogo}/>
        <Text textAlign="center" color="black" fontSize="1em"> {details.titulo} </Text>
        <p>{details.fechaPublicacion}</p>
    </Flex>
}