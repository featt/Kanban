import { gql } from '@apollo/client';

const ME = gql`
    query {
        me {
            login
        }
}
`

const GET_USER_BOARDS = gql`
    query {
        getUserBoards {
            id
            title
        }
    }
`

const GET_BOARD = gql`
    query Board($boardId: String!) {
        board(data: { boardId: $boardId }) {
            id
            title
            tasks {
                boardId
                title
                status
            }
        }
    }
`


export { GET_USER_BOARDS, ME, GET_BOARD }