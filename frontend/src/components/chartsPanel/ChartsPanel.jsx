import { Flex } from "@chakra-ui/react"
import { PieChart } from "./PieChart/PieChart"



export const ChartsPanel = () => {

    return <Flex h="50em">
        <PieChart/>
        <PieChart/>
    </Flex>
}