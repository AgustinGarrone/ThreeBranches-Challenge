import { Flex } from "@chakra-ui/react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const LineChart = ({books}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  // Procesar los datos para contar la cantidad de libros por año
  const booksByYear = books.reduce((acc, book) => {
    const year = new Date(book.fechaPublicacion).getFullYear();
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  // Obtener los años y las cantidades
  const years = Object.keys(booksByYear);
  const bookCounts = Object.values(booksByYear);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };


  const data = {
    labels:years,
    datasets: [
      {
        label: "Cantidad de Libros",
        data: bookCounts,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  return (
    <Flex
      borderRadius="10px"
      alignItems="center"
      justifyContent="center"
      mt="4em"
      ml="4em"
      mb="1.5em"
      bg="white"
      w="40%"
      h="25em"
    >
      <Line options={options} data={data} />;
    </Flex>
  );
};
