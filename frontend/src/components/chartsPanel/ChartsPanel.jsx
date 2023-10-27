import { Flex } from "@chakra-ui/react"
import { PieChart } from "./pieChart/PieChart"
import { LineChart } from "./lineChart/LineChart"
import { MailSender } from "./mailSender/MailSender"



export const ChartsPanel = ({books}) => {
    return <Flex  ml="6em">
        <PieChart books={books}/>
        <LineChart books={books}/>
        <MailSender/>
    </Flex>
}