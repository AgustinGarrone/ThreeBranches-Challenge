import { Flex, Image, Text } from "@chakra-ui/react"
import bookLogo from "../../../assets/book.png"

export const BookCard = ({details}) => {

    return <Flex direction="column" borderRadius="30px" cursor="pointer" bg="white" border="1px solid black" w="15em" alignItems="center" h="80%" justifyItems="center" m="1em">
        <Image mt="1em" h="7em" src={bookLogo}/>
        <Text textAlign="center" color="black" fontSize="2em"> {details.titulo} </Text>
        <p>{details.fechaPublicacion}</p>
    </Flex>
}