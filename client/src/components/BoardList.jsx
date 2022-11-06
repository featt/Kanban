import { useQuery } from "@apollo/client"
import { Accordion, Button, Tag, Text, VStack, AccordionItem, AccordionIcon, AccordionButton, AccordionPanel, Box } from "@chakra-ui/react"
import { GET_USER_BOARDS } from "../graphql/quereis"


const BoardList = ({state}) => {
    const { data, loading, error } = state      
    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error {error}</Text>
    return (
        <VStack>            
            <Accordion allowToggle>
                <AccordionItem>                    
                    <AccordionButton>
                        <Box textAlign='left'>Выши доски</Box>
                        <AccordionIcon />
                    </AccordionButton>
                    
                    <AccordionPanel display='flex' flexDirection='column' w='100%'>
                        {data.getUserBoards.map(board => (
                            <Tag cursor='pointer' color='black' mt='8px' key={board.id}>{board.title}</Tag>
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </VStack>
    )
}

export default BoardList