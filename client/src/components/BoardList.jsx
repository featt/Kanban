import { useQuery } from "@apollo/client"
import { Tag, Text, VStack, ListItem, List } from "@chakra-ui/react"
import { GET_USER_BOARDS } from "../graphql/quereis"
import { useSetAtom } from 'jotai'
import { selectedBoardId } from "../store"

const BoardList = ({state, refetchBoards }) => {
    const { data, loading, error } = state      
    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error {error}</Text>

    const onClick = (boardId) => async () => {
        selectBoard(boardId);         
    }

    const selectBoard = useSetAtom(selectedBoardId)
    return (
        <List w='full'>           
            
            {data.getUserBoards.map(board => (
                <ListItem 
                    cursor='pointer'
                    bg='black'
                    w='full'
                    color='white'
                    p='5px' 
                    mt='8px' 
                    key={board.id}
                    onClick={onClick(board.id)}
                >{board.title}</ListItem>
            ))}
                    
        </List>
    )
}

export default BoardList