import { VStack, Text, Divider, Box, Flex, Button, Input, FormControl, Tag, HStack, Badge } from "@chakra-ui/react"
import ColumnItem from "./ColumnItem"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy, arraySwap } from '@dnd-kit/sortable'
import { useRef, useState } from "react"
import { FaRegListAlt, FaRegCheckCircle, FaRegClock, FaPlus } from 'react-icons/fa';
import { useMutation } from "@apollo/client"
import { CREATE_TASK } from "../graphql/mutations"

const setNameCol = id => {
    if(id === 'root') return 'Дела'   
    if(id === 'container1') return 'В процессе'   
    if(id === 'container2') return 'Выполенные'       
}

const colorTag = id => {
    if(id === 'root') return 'cyan'    
    if(id === 'container1') return 'orange'   
    if(id === 'container2') return 'green'  
}

const setIcon = id => {
    if(id === 'root') return <FaRegListAlt style={{marginRight: "10px"}}/>  
    if(id === 'container1') return <FaRegClock style={{marginRight: "10px"}}/>  
    if(id === 'container2') return <FaRegCheckCircle style={{marginRight: "10px"}}/>  
}


const Column = (props) => {  
    const { id, items, boardId, refetch } = props;    
    const { setNodeRef } = useDroppable({ id });    
    const inputRef = useRef();
    const [toggle, setToggle] = useState(false)
    const [createTask, { data, error, loading }] = useMutation(CREATE_TASK)
    
    const handelOnClick = async () => {
        setToggle(p => !p)
        if(inputRef.current.value === '') return;
        await createTask({
            variables: {
                title: inputRef.current.value,
                boardId
            }
        })
        await refetch()
        console.log(boardId);        
    }

    return (
        <VStack color='white' minH='30%' minW='30%' bg='#383838' p='10px' rounded='lg'>

            <HStack w='100%' justifyContent='space-between'>
                <Tag size='lg' borderRadius='full' colorScheme={colorTag(id)}>
                    {setIcon(id)}
                    {setNameCol(id)}                
                </Tag>
                <Badge fontSize='15px' colorScheme='purple'>{items.length}</Badge>
            </HStack>

            <Divider />
                <SortableContext 
                    id={id}
                    items={items} 
                    strategy={verticalListSortingStrategy}
                    >
                    <VStack ref={setNodeRef} w='100%'>
                        {items.map((item, idx) => <ColumnItem key={idx} id={item} />)}
                    </VStack>
                </SortableContext> 

                {id === 'root' 
                ? 
                toggle  ? 
                (<FormControl as='form' display='flex' w='85%'>
                    <Input w='70%' name="title" ref={inputRef} type='text' placeholder="Введите название..." />
                    <Button w='30%' color='black' ml='8px' onClick={handelOnClick} type="submit">Добавить</Button>
                </FormControl> ) 
                :  <Button color='black' onClick={() => setToggle(p => !p)}><FaPlus/></Button>                
                : <></>}
                               
        </VStack>
    )
}

export default Column