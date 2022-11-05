import { useQuery } from "@apollo/client"
import { Button, Tag, Text, VStack } from "@chakra-ui/react"
import { GET_USER_BOARDS } from "../graphql/quereis"


const BoardList = ({state}) => {
    const { data, loading, error } = state      
    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error {error}</Text>
    return (
        <VStack>
            {data.getUserBoards.map(board => (
                <Tag cursor='pointer' color='black' key={board.id}>{board.title}</Tag>
            ))}
        </VStack>
    )
}

export default BoardList