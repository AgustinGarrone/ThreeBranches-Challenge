import { Flex, Text } from "@chakra-ui/react"
import { BookCard } from "./bookCard/BookCard";


export const BookPanel = ({ books }) => {
    console.log(books);
    return (
      <Flex bg="white" h="20em" w="60%" overflowX="scroll"  mt="4em" ml="6em" alignItems="center">
        <Text>Books</Text>
        {
            books.map((book) => (
                <BookCard details={book} key={book.id}/>
            ))
        }
      </Flex>
    );
  };