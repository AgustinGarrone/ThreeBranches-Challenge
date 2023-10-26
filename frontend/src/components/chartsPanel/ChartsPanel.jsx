import { Flex } from "@chakra-ui/react"
import { PieChart } from "./pieChart/PieChart"
import { LineChart } from "./lineChart/LineChart"



export const ChartsPanel = () => {

    return <Flex h="50em">
        <PieChart/>
        <LineChart/>
    </Flex>
}