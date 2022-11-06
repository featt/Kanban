import { Box, Button, FormControl, FormHelperText, FormLabel, HStack, Input, Text, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { LOGIN_USER_MUTATION } from '../graphql/mutations'
import { useEffect } from "react";
import { useMutation, useQuery } from '@apollo/client';
import useUserStore from "../store/useUserStore";
import { useNavigate, Link } from 'react-router-dom'


// PASSWORD = бебра424242
const Login = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')    
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER_MUTATION)        
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);
    const toast = useToast()

    useEffect(() => {
        if(!data) return;        
        if(data.login.user.login) 
        setUser(data.login.user.login)
        localStorage.setItem('accessToken', data.login.accessToken);
        localStorage.setItem('refreshToken', data.login.refreshToken);        
    }, [data])
    
    const handlerLogin = async (e) => {
        e.preventDefault()  
        if(error) return toast({
            title: 'Логин или пароль не верны',            
            status: 'error',
            duration: 9000,
            isClosable: true,
        })     
        await loginUser( { 
            variables: {
                    login: login,
                    password: password
                }
            }
        )  
        navigate('/')
    }
   
    return (
        <FormControl display='flex' flexDirection='column' w='20%' justifyContent='center' mx='auto' color='white' >
            
            <Text textAlign='center' fontSize='32px' mb='20px'>Вход</Text>
                   
            <form onSubmit={handlerLogin}  >
                <FormLabel>Логин</FormLabel>
                <Input type='text' name="login" value={login} onChange={e => setLogin(e.target.value)} placeholder="Введите свой логин..."/>
                <FormHelperText>Введите свой логин</FormHelperText>  

                <FormLabel mt='10px'>Пароль</FormLabel>
                <Input type='password' name="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Введите свой пароль..."/>
                <FormHelperText>Введите свой пароль</FormHelperText>

                <Button bg='green' _hover='green.400' mt='20px' type="submit" w='full'>Войти</Button>

                <HStack mt='10px' justifyContent='center'>
                    <Text>Нет аккаунта?</Text>
                    <Link to='/register'>Зарегистрироваться</Link>
                </HStack>
            </form>
            
        </FormControl>
    )
}

export default Login