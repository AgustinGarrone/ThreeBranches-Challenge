import { Flex } from "@chakra-ui/react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

export const PieChart = ({books}) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    const [filteredBooks , setFilteredBooks] = useState([])

    useEffect(() => {
      filtrarLibrosPorAnio()
    } , [])

    const filtrarLibrosPorAnio = () => {
      const librosPorAnio = [];
      books.forEach((libro) => {
        const fecha = new Date(libro.fechaPublicacion);
        const anio = fecha.getFullYear();
        if (!librosPorAnio[anio]) {
          librosPorAnio[anio] = [];
        }
        librosPorAnio[anio].push(libro);
      });
      setFilteredBooks(librosPorAnio)
    }


    const data = {
      labels: Object.keys(filteredBooks), // Utiliza los años como etiquetas
      datasets: [
        {
          label: 'Libros publicados en ' ,
          data: Object.values(filteredBooks).map((booksOfYear) => booksOfYear.length), // Obtiene la cantidad de libros por año
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return <Flex borderRadius="10px" alignItems="center" justifyContent="center" m="4em" bg="white" w="40%" h="25em">
        <Pie data={data} />
    </Flex>
}