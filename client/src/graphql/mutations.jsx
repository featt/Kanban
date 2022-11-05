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

export { LOGIN_USER_MUTATION, CREATE_BOARD };
