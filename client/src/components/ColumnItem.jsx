import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'


const ColumnItem = (props) => {  
    const { id } = props;  
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
      } = useSortable({ id: props.id });
    const style = {
        transform: CSS.Transform.toString(transform), 
        transition       
    }
    return (
        <VStack ref={setNodeRef} style={style} {...attributes} {...listeners} w='100%' minH='100px' bg='#252630' rounded='lg' p='10px'>
            <Text maxWidth='300px' noOfLines={[1,2,3,4,5,6]} color='white'>{id}</Text>        
        </VStack>
    )
}

export default ColumnItem