import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient'


ReactDOM.createRoot(document.getElementById('root')).render(  
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </BrowserRouter>
    </ApolloProvider>  
)
