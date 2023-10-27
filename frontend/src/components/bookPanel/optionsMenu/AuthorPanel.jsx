import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import api from "../../../config/api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import ContextConnected from "../../../config/ContextConnected";

export const AuthorPanel = ({ authors }) => {

  const Connected = useContext(ContextConnected)
  //Pone inputs en la tabla para editar
  const [fieldsEditMode, setFieldsEditMode] = useState(false);
  const initialValues = {
    nombre: "",
    apellido: "",
    edad: "",
  };

  //Author edit values
  const [values, setValues] = useState({});
  //Render authors state
  const [localAuthors, setLocalAuthors] = useState(authors);

  useEffect(() => {
    setLocalAuthors(authors)
  }, [authors]);

  const addAuthor = async (values, { resetForm }) => {
    try {
      const res = await api.post("/author/", values);
       // Actualiza el estado local con los nuevos datos
       setLocalAuthors([...localAuthors, res.data.data]);
      toast.success(" Agregado con éxito!", {
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
  };

  const deleteAuthor = async (id) => {
    try {
      const res = await api.delete("/author/" + id);
      console.log(res.data);
       // Actualiza el estado local eliminando el autor con el ID especificado
       setLocalAuthors(localAuthors.filter((author) => author.id !== id));
      toast.success("Eliminado correctamente.", {
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
      toast.error("Error. intente nuevamente", {
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

  const updateAuthorHandler = (author) => {
    if (fieldsEditMode) {
      updateAuthor(author);
      setFieldsEditMode(false);
    } else {
      setFieldsEditMode(true);
    }
  };

  const handleInputChange = (e, authorId) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [authorId]: {
        id: authorId,
        [name]: value,
      },
    });
  };

  const updateAuthor = async (author) => {
    try {
      const combinedData = {
        id: author.id,
        nombre: values[author.id]?.nombre || author.nombre,
        apellido: values[author.id]?.apellido || author.apellido,
        edad: values[author.id]?.edad || author.edad,
      }
      Connected.setAuthors(combinedData)
      const res = await api.put("/author/" , combinedData);
      console.log(res.data);
      // Actualiza el estado local con los datos actualizados
      const updatedAuthors = localAuthors.map((localAuthor) =>
        localAuthor.id === author.id ? { ...localAuthor, ...combinedData } : localAuthor
      );
      setLocalAuthors(updatedAuthors);
      toast.success("Actualizado correctamente.", {
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
      toast.error("Error. intente nuevamente", {
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
      borderRadius="10px"
      bg="white"
      h="20em"
      w="30%"
      mt="4em"
      ml="3em"
      mr="1em"
    >
      <Text>Authors</Text>
      <TableContainer h="80%" w="100%" overflowX="scroll" overflowY="auto">
        <Table variant="striped" colorScheme="teal">
          {/*  <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Lastname</Th>
              <Th isNumeric>Age</Th>
            </Tr>
          </Thead>
          <Tbody>
            {localAuthors.map((author) => (
              <Tr key={author.id}>
                {fieldsEditMode ? (
                  <Td>
                    <Input
                      type="text"
                      value={values[author.id]?.nombre || author.nombre}
                      on={(e) => handleInputChange(e, author.id)}
                      name="nombre"
                    />
                  </Td>
                ) : (
                  <Td>{author.nombre}</Td>
                )}
                {fieldsEditMode ? (
                  <Td>
                    <Input
                      type="text"
                      name="apellido"
                      value={values[author.id]?.apellido || author.apellido}
                      onChange={(e) => handleInputChange(e, author.id)}
                    />
                  </Td>
                ) : (
                  <Td>{author.apellido}</Td>
                )}
                {fieldsEditMode ? (
                  <Td>
                    <Input
                      type="text"
                      value={values[author.id]?.edad || author.edad}
                      onChange={(e) => handleInputChange(e, author.id)}
                      name="edad"
                    />
                  </Td>
                ) : (
                  <Td isNumeric>{author.edad}</Td>
                )}
                <Td>
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <EditIcon
                      cursor="pointer"
                      m=".5em"
                      onClick={() => updateAuthorHandler(author)}
                    ></EditIcon>
                    <DeleteIcon
                      onClick={() => deleteAuthor(author.id)}
                      cursor="pointer"
                    ></DeleteIcon>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        bg="#1C4E80"
        h="20%"
        alignSelf="flex-end"
        mt="1em"
        w="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Formik
          initialValues={initialValues}
          /* validationSchema={validationSchema} */
          onSubmit={addAuthor}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors }) => (
            <Form
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div>
                <InputGroup>
                  <Field name="nombre">
                    {({ field }) => (
                      <Input
                        margin=".8em"
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
                        margin=".8em"
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
                        margin=".8em"
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
                      : errors.edad
                      ? errors.edad
                      : null}
                  </Flex>
                )}
              />

              <Button
                _hover={{ bg: "darkblue", color: "white" }}
                w="20%"
                mt="1em"
                type="submit"
                margin=".8em"
              >
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};
