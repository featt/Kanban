import Sidebar from './Sidebar'
import Board from './Board'
import { useAtomValue } from 'jotai'
import { useQuery } from '@apollo/client'
import { selectedBoardId } from '../store'
import { GET_BOARD } from '../graphql/quereis'
import { useBoard } from '../hooks/useBoard'

const Main = () => {

    const boardId = +useAtomValue(selectedBoardId)
    const { items, refetch, titleBoard } = useBoard(boardId)
    return (
        <>
            <Sidebar refetchBoards={refetch}/>

            <Board items={items} boardId={boardId} refetch={refetch} titleBoard={titleBoard} />
        </>
    )
}

export default Main