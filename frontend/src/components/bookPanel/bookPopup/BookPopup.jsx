import { CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import { faBook, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { useContext, useState } from "react";
import ContextConnected from "../../../config/ContextConnected";
import "./bookPopup.css";
import { MultiSelect } from "react-multi-select-component";

export const BookPopup = ({
  setOpenUpdatePopup,
  setSaveMode,
  authors,
  editValues,
}) => {
  const Connected = useContext(ContextConnected);
  const [multiselectValue, setMultiselectValue] = useState([]);

  //Init form
  const initialValues = {
    titulo: "",
    fechaPublicacion: "",
    authors: "",
  };

  //Multiselect options
  const options = authors.map((author) => ({
    label: author.nombre + " " + author.apellido,
    value: author.nombre + " " + author.apellido,
  }));

  console.log(options);
  const closePopup = () => {
    if (setSaveMode) {
      setSaveMode(false);
    }
    if (setOpenUpdatePopup) {
      setOpenUpdatePopup(false);
    }
  };
  /*   const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("El correo electrónico no es válido")
      .required("Email requerido"),
    password: Yup.string().required("Contraseña requerida"),
  }); */

  const saveNewBook = async (values, { resetForm }) => {
    console.log("ay si");
    try {
      let autoresSpliteados = [];
      for (let i = 0; i < multiselectValue.length; i++) {
        const autoresFiltrados = authors.filter((autor) => {
          const partes = multiselectValue[i].value.split(" ");
          const nombre = partes[0]; // El primer elemento es el nombre
          const apellido = partes.slice(1).join(" ");
          return (
            autor.nombre.toLowerCase() === nombre.toLowerCase() &&
            autor.apellido.toLowerCase() === apellido.toLowerCase()
          );
        });
        // Agregar los autores filtrados al array autoresSpliteados
        autoresSpliteados = autoresSpliteados.concat(autoresFiltrados);
      }

      values.authors = autoresSpliteados;
      console.log(values);
      const res = await api.post("/book/", values);
      Connected.setBooks(res.data.data);
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
      resetForm();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      className="glass-background"
      bg="black"
      zIndex="100"
      borderRadius="40px"
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      height={{ base: "24em", xl: "24em", "2xl": "24em" }}
      width={{ base: "18em", xl: "350px", "2xl": "350px" }}
      position="fixed"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
    >
      <Flex
        borderRadius="40px 40px 0 0"
        bg="darkblue"
        alignItems="center"
        justifyContent="space-around"
        w="100%"
        h="4em"
      >
        <Text color="white" fontSize="1.5em" textAlign="center">
          Guardar libro
        </Text>
        <CloseIcon color="white" onClick={closePopup} />
      </Flex>
      <div className="container">
        <Formik
          initialValues={editValues ? editValues : initialValues}
          /* validationSchema={validationSchema} */
          onSubmit={saveNewBook}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors }) => (
            <Form style={{ marginTop: "3em" }}>
              <div>
                <InputGroup>
                  <InputLeftAddon
                    borderRadius="0"
                    children={<FontAwesomeIcon icon={faBook} />}
                  />
                  <Field name="titulo">
                    {({ field }) => (
                      <Input
                        borderRadius="0 10px 10px 0"
                        placeholder="Titulo"
                        name="titulo"
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
                  <InputLeftAddon
                    borderRadius="0"
                    children={<FontAwesomeIcon icon={faBook} />}
                  />
                  <Field name="fechaPublicacion">
                    {({ field }) => (
                      <Input
                        borderRadius="0 10px 10px 0"
                        placeholder="Fecha de Publicación"
                        name="fechaPublicacion"
                        color="white"
                        type="date"
                        {...field}
                      />
                    )}
                  </Field>
                </InputGroup>
              </div>
              <div>
                <InputGroup>
                  <InputLeftAddon
                    borderRadius="0"
                    children={<FontAwesomeIcon icon={faUser} />}
                  />

                  <MultiSelect
                    options={options}
                    value={multiselectValue}
                    onChange={setMultiselectValue}
                    labelledBy="Select"
                  />
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
                    {errors.email
                      ? errors.email
                      : errors.password
                      ? errors.password
                      : null}
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
      </div>
    </Flex>
  );
};
