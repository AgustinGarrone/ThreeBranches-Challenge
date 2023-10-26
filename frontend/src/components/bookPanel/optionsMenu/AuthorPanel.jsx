import { Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"


export const AuthorPanel = ({authors}) => {

    return <Flex direction="column" bg="white" h="20em" w="30%" mt="4em" ml="3em" mr="1em">
      <Text>Authors</Text>
        <TableContainer w="100%">
  <Table variant='striped' colorScheme='teal'>
   {/*  <TableCaption>Imperial to metric conversion factors</TableCaption> */}
    <Thead>
      <Tr>
        <Th>Name</Th>
        <Th>Lastname</Th>
        <Th isNumeric>Age</Th>
      </Tr>
    </Thead>
    <Tbody>
      {
        authors.map((author) => (
          <Tr key={author.id}>
          <Td>{author.nombre}</Td>
          <Td>{author.apellido}</Td>
          <Td isNumeric>{author.edad}</Td>
        </Tr>
        ))
      }
    </Tbody>
  </Table>
</TableContainer>
    </Flex>
}