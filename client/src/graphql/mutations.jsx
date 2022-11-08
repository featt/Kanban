import { gql } from "@apollo/client";

const LOGIN_USER_MUTATION = gql`     
    mutation Login($login: String!, $password: String!) {
        login(data: { login: $login, password: $password }) {
            user {
                login
            }
            accessToken
            refreshToken
        }
    }
`

const CREATE_BOARD = gql`
    mutation CreateBoard($title: String!) {
        createBoard(data: { title: $title }) {
            id
            title
        }
    }
`

const CREATE_USER = gql`
    mutation CreateUser($login: String!, $password: String!) {
        signup(data: { login: $login, password: $password }) {
            user {
                login
            }
        }
    }
`

const CREATE_TASK = gql`
    mutation CreateTask($boardId: Int!, $title: String!) {
        createTask(data: { boardId: $boardId, title: $title }) {
            id
            title
            status
        }
    }
`

export { LOGIN_USER_MUTATION, CREATE_BOARD, CREATE_USER, CREATE_TASK };
