import { Button, Flex, Input, Text } from "@chakra-ui/react"
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/api";


export const MailSender = () => {
        const [inputValue , setInputValue] = useState()

        const handleInputValue = (e) => {
            const value = e.target.value; // Obtener el valor del input
            setInputValue(value); // Actualizar el estado con el valor del input
        }

    const sendEmail = async () => {
        try {
            const data = {
                email: inputValue
            };
            const res = await api.post("/mail/" , data)
            toast.success("Done. Check your email!", {
                position: "bottom-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "dark",
              });
            setInputValue()
        } catch (e) {
            toast.error(e.message, {
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

    return <Flex direction="column" borderRadius="10px" w="30%" h="10em"   m="4em" bg="#1C4E80" alignSelf="flex-end" justifyContent="flex-start" alignItems="center">
        <Text mt="2em" color="white" fontSize="1em" textAlign="center">Subscribe to our newsletter</Text>
        <Input onChange={(e) => handleInputValue(e)} required m=".4em" width="80%" type="email"></Input>
        <Button onClick={sendEmail}>Register</Button>
    </Flex>
}