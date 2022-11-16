import { HStack, Text, Heading, VStack, Box } from "@chakra-ui/react"
import Column from "./Column"
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react"
import ColumnItem from "./ColumnItem";
import useUserStore from "../store/useUserStore";
import { useMutation } from "@apollo/client";
import { SET_DONE, SET_IN_PROGRESS } from "../graphql/mutations";
import { FaRegListAlt, FaRegCheckCircle, FaRegClock, FaPlus } from 'react-icons/fa';


const Board = ({ items, boardId, refetch, titleBoard }) => {
    const [activeId, setActiveId] = useState();
    const user = useUserStore(state => state.user)
    const [setInProgress, { loading }] = useMutation(SET_IN_PROGRESS)
    const [setDone] = useMutation(SET_DONE)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );

    return (
        <VStack w='80%' bg='#191A23' h='100vh' p='55px' >
            {!boardId ? (
                <Box w='80%' h='36%' bg='#343649' px={20} py={30} rounded='lg' shadow='outline'>
                    <Heading mb={10} color='white'>Добро пожаловать в Productivity, {user}!</Heading>
                    <Heading mb={8} size='lg' color='white'>Мы радя тебя видеть ❤️</Heading>
                    <Heading size='md' color='white'>{user}, для того чтобы начать пользововаться Productivity, создай или выбери доску!</Heading>
                </Box>
            ) : <>
                <Text fontSize='32px' color='white'>{titleBoard ? titleBoard : 'Loading...'}</Text>
                <HStack justifyContent='space-around' w='100%' h='100vh' alignItems='flex-start'>
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCorners}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    >
                        <Column
                            id="NOT_DONE"
                            icon={<FaRegListAlt style={{ marginRight: "10px" }} />}
                            items={items.NOT_DONE}
                            colorTag='cyan'
                            tag="Дела"
                            boardId={boardId}
                            refetch={refetch}
                        />
                        <Column
                            id="IN_PROGRESS"
                            colorTag='orange'
                            tag="В процессе"
                            icon={<FaRegClock style={{ marginRight: "10px" }} />}
                            items={items.IN_PROGRESS}
                        />
                        <Column
                            id="DONE"
                            colorTag='green'
                            tag="Выполненные"
                            icon={<FaRegCheckCircle style={{ marginRight: "10px" }} />}
                            items={items.DONE}
                        />
                        <DragOverlay>{activeId ? <ColumnItem id={activeId} /> : null}</DragOverlay>
                    </DndContext>
                </HStack>
            </>}


        </VStack>
    );

    function findContainer(id) {
        return id.status;
    }

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;
        setActiveId(id);
    }

    async function handleDragEnd(event) {
        const over = event.over.id;
        const active = event.active.id;


        const activeContainer = findContainer(active);
        const overContainer = findContainer(over);



        if (
            !activeContainer ||
            !overContainer ||
            activeContainer === overContainer
        ) {
            return;
        }

        if (overContainer === 'IN_PROGRESS') {
            await setInProgress({ variables: { taskId: active.id } })
        } else if (overContainer === 'DONE') {
            await setDone({ variables: { taskId: active.id } })
        }

        await refetch()
    }
}

export default Board
