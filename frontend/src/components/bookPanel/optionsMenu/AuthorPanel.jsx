import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Button, Flex, Input, InputGroup, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react"
import api from "../../../config/api"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { faBook } from "@fortawesome/free-solid-svg-icons"



export const AuthorPanel = ({authors}) => {

  const initialValues = {
    nombre:"",
    apellido:"",
    edad:""
  }

  const addAuthor = async (values , {resetForm}) => {
    try {
      const res = await api.post("/author/" , values)
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
      console.log(e);
    }

  }

    return <Flex direction="column" borderRadius="10px" bg="white" h="20em" w="30%" mt="4em" ml="3em" mr="1em">
      <Text>Authors</Text>
        <TableContainer h="80%" w="100%">
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
          <Td><Flex direction="column" alignItems="center" justifyContent="center">
            <EditIcon cursor="pointer" m=".5em"></EditIcon>
            <DeleteIcon cursor="pointer" ></DeleteIcon>
          </Flex>
          </Td>
        </Tr>
        ))
      }    
    </Tbody>
  </Table>
  
</TableContainer>
<Flex bg="#1C4E80" h="20%" alignSelf="flex-end" mt="1em" w="100%" alignItems="center" justifyContent="center">
 
        <Formik
          initialValues={ initialValues}
          /* validationSchema={validationSchema} */
          onSubmit={addAuthor}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors }) => (
            <Form style={{ marginTop: "3em" }}>
              <div>
                <InputGroup>
                  <Field name="nombre">
                    {({ field }) => (
                      <Input
                        borderRadius="0 10px 10px 0"
                        placeholder="nombre"
                        name="nombre"
                        color="white"
                        type="text"
                        {...field}
                      />
                    )}
                  </Field>
                </InputGroup>
              </div>

              <div>
                <InputGroup>
                  <Field name="apellido">
                    {({ field }) => (
                      <Input
                        borderRadius="0 10px 10px 0"
                        placeholder="Apellido"
                        name="apellido"
                        color="white"
                        type="textt"
                        {...field}
                      />
                    )}
                  </Field>
                </InputGroup>
              </div>
              <div>
                <InputGroup>
                <Field name="edad">
                    {({ field }) => (
                      <Input
                        borderRadius="0 10px 10px 0"
                        placeholder="Edad"
                        name="edad"
                        color="white"
                        type="textt"
                        {...field}
                      />
                    )}
                  </Field>
                  
                </InputGroup>
              </div>
              <ErrorMessage
                render={() => (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    position="absolute"
                    className="inputError"
                  >
                    {errors.nombre
                      ? errors.nombre
                      : errors.apellido
                      ? errors.apellido
                      : errors.edad ?
                    errors.edad : null}
                  </Flex>
                )}
              />
              <Flex
                w="100%"
                alignItems="center"
                pt="2em"
                justifyContent="center"
              ></Flex>
              <Button
                _hover={{ bg: "darkblue", color: "white" }}
                w="100%"
                mt="1em"
                type="submit"
              >
                Guardar
              </Button>
            </Form>
          )}
        </Formik>

      </Flex>
    </Flex>
}