import { useQuery } from "@apollo/client"
import { Tag, Text, VStack, ListItem, List, Center } from "@chakra-ui/react"
import { GET_USER_BOARDS } from "../graphql/quereis"
import { useSetAtom } from 'jotai'
import { selectedBoardId } from "../store"

const BoardList = ({ state, refetchBoards }) => {
    const { data, loading, error } = state
    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error {error}</Text>

    const selectBoard = useSetAtom(selectedBoardId)

    const onClick = (boardId) => () => {
        selectBoard(boardId);
    }

    return (
        <List display='flex' flexDirection='column' w='full' alignItems='center' justifyContent='center'>

            {data.getUserBoards.map(board => (
                <ListItem
                    cursor='pointer'
                    bg='#262731'
                    w='60%'
                    color='white'
                    p='5px'
                    py='8px'
                    mt='8px'
                    rounded='lg'
                    boxShadow='base'
                    key={board.id}
                    onClick={onClick(board.id)}
                >
                    <Center>{board.title}</Center>
                </ListItem>
            ))}

        </List>
    )
}

export default BoardList
