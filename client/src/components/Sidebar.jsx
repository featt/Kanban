import { useMutation, useQuery } from "@apollo/client"
import { Button, HStack, Input, VStack, FormControl, Avatar, Tag, TagLabel } from "@chakra-ui/react"
import { useState } from "react"
import { useRef } from "react"
import { CREATE_BOARD } from "../graphql/mutations"
import { GET_USER_BOARDS, ME } from "../graphql/quereis"
import { FaUserCircle } from 'react-icons/fa';
import useUserStore from "../store/useUserStore"
import BoardList from "./BoardList"
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ refetchBoards }) => {
    const user = useUserStore(state => state.user)
    const inputRef = useRef()
    const [createBoard, { data }] = useMutation(CREATE_BOARD)  
    const { refetch, ...boardsQuery } = useQuery(GET_USER_BOARDS)          
    const navigate = useNavigate()

    const handlerBoards = async (e) => {
        e.preventDefault();
        if(inputRef.current.value === '') return;
        await createBoard({
            variables: { title: inputRef.current.value }
        })
        await refetch()              
        inputRef.current.value = '';
    }

    const logOut = () => {
        navigate('/login');
        localStorage.clear();
    }

    return (
        <VStack w='20%' bg='#191A23' h='100vh' color='white' pl='15px' borderRightColor='#845ef7' borderRightWidth='0.3px' justifyContent='space-between'>
            
            <FormControl display='flex' w='80%' as='form' method="post" onSubmit={handlerBoards} flexDirection='row' mt='40px'>                             
                <Input name="title" ref={inputRef} placeholder="Введиет название..."/>
                <Button type="submit" ml='10px' color='black' fontSize='12px'>Добавить</Button>                              
            </FormControl>                                 
            
            <BoardList state={boardsQuery} refetchBoards={refetchBoards}/>    

            <HStack pb='20px' >
                <Tag size='lg' colorScheme='#292929'>                    
                    <FaUserCircle size='35px'/>
                    <TagLabel fontSize='2xl' ml='10px' color='white'>{user}</TagLabel>
                    <Button onClick={logOut} size='sm' ml='15px' color='black' rightIcon={<FaSignOutAlt/>}>Выйти</Button>
                </Tag>
            </HStack>                              
                                
        </VStack>
    )
}

export default Sidebar