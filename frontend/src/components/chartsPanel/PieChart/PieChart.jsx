import { Flex } from "@chakra-ui/react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useContext, useEffect, useRef, useState } from "react";
import { Pie } from "react-chartjs-2";
import ContextConnected from "../../../config/ContextConnected";

export const PieChart = ({ books }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const Connected = useContext(ContextConnected);
  const [filteredBooks, setFilteredBooks] = useState({});
  // Genera una nueva clave (key) cuando cambie filteredBooks
  const [chartKey, setChartKey] = useState(0);

  const filtrarLibrosPorAutor = () => {
    const librosPorAutor = {};

    if (Connected.books) {
      Connected.books.forEach((libro) => {
        libro.authors.forEach((autor) => {
          const nombreAutor = `${autor.nombre} ${autor.apellido}`;
          if (!librosPorAutor[nombreAutor]) {
            librosPorAutor[nombreAutor] = [];
          }
          librosPorAutor[nombreAutor].push(libro);
        });
      });
    } else {
      books.forEach((libro) => {
        libro.authors.forEach((autor) => {
          const nombreAutor = `${autor.nombre} ${autor.apellido}`;
          if (!librosPorAutor[nombreAutor]) {
            librosPorAutor[nombreAutor] = [];
          }
          librosPorAutor[nombreAutor].push(libro);
        });
      });
    }
    setFilteredBooks(librosPorAutor);
    // Incrementa el key para forzar la actualización del componente Pie
    setChartKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    filtrarLibrosPorAutor();
  }, [Connected.books , Connected.cardUpdated]);

  const data = {
    labels: Object.keys(filteredBooks),
    datasets: [
      {
        label: "Libros publicados",
        data: Object.values(filteredBooks).map(
          (booksOfYear) => booksOfYear.length
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      ml=".3em"
      mt="4em"
      bg="white"
      w="40%"
      h="25em"
    >
      <Pie data={data} key={chartKey} />
    </Flex>
  );
};
