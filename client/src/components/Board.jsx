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
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useState } from "react"
import ColumnItem from "./ColumnItem";
import useUserStore from "../store/useUserStore";

const defaultAnnouncements = {
    onDragStart(id) {
      console.log(`Picked up draggable item ${id}.`);
    },
    onDragOver(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was moved over droppable area ${overId}.`
        );
        return;
      }
  
      console.log(`Draggable item ${id} is no longer over a droppable area.`);
    },
    onDragEnd(id, overId) {
      if (overId) {
        console.log(
          `Draggable item ${id} was dropped over droppable area ${overId}`
        );
        return;
      }
  
      console.log(`Draggable item ${id} was dropped.`);
    },
    onDragCancel(id) {
      console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    }
  };

const Board = ({ items, boardId, refetch, titleBoard }) => {
    const [activeId, setActiveId] = useState();   
    const user = useUserStore(state => state.user)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates
        })
    );
 

    return (
        <VStack w='80%' bg='#191A23' h='100vh' p='55px' >
           {items === null ? (
            <Box w='80%' h='36%' bg='#343649' px={20} py={30} rounded='lg' shadow='outline'>
              <Heading mb={10} color='white'>Добро пожаловать в Productivity, {user}!</Heading>
              <Heading mb={8} size='lg' color='white'>Мы радя тебя видеть ❤️</Heading>
              <Heading size='md' color='white'>{user}, для того чтобы начать пользововаться Productivity, создай или выбери доску!</Heading>
            </Box>
           ) : <>
            <Text fontSize='32px' color='white'>{titleBoard ? titleBoard : 'Loading...'}</Text>
            <HStack justifyContent='space-around' w='100%' h='100vh' alignItems='flex-start'>
                <DndContext
                    announcements={defaultAnnouncements}
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}                       
                >
                    <Column id="root" items={items.root} boardId={boardId} refetch={refetch} />
                    <Column id="container1" items={items.container1} />
                    <Column id="container2" items={items.container2} />
                    <DragOverlay>{activeId ? <ColumnItem id={activeId} /> : null}</DragOverlay>
                </DndContext>
            </HStack>
           </>}     
          
                 
        </VStack>
    );

    function findContainer(id) {
        if (id in items) {
          return id;
        }
    
        return Object.keys(items).find((key) => items[key].includes(id));
    }

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;    
        setActiveId(id);
    }

    function handleDragOver(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);
        console.log(overContainer);
        if (
          !activeContainer ||
          !overContainer ||
          activeContainer === overContainer
        ) {
          return;
        }
    
        setItems((prev) => {
          const activeItems = prev[activeContainer];
          const overItems = prev[overContainer];

          const activeIndex = activeItems.indexOf(id);
          const overIndex = overItems.indexOf(overId);
    
          let newIndex;
          if (overId in prev) {
            newIndex = overItems.length + 1;
          } else {
            const isBelowLastItem =
              over &&
              overIndex === overItems.length - 1;
    
            const modifier = isBelowLastItem ? 1 : 0;
    
            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
          }
    
          return {
            ...prev,
            [activeContainer]: [
              ...prev[activeContainer].filter((item) => item !== active.id)
            ],
            [overContainer]: [
              ...prev[overContainer].slice(0, newIndex),
              items[activeContainer][activeIndex],
              ...prev[overContainer].slice(newIndex, prev[overContainer].length)
            ]
          };
        });
    }
    function handleDragEnd(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;
    
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);
    
        if (
          !activeContainer ||
          !overContainer ||
          activeContainer !== overContainer
        ) {
          return;
        }
    
        const activeIndex = items[activeContainer].indexOf(active.id);
        const overIndex = items[overContainer].indexOf(overId);
    
        if (activeIndex !== overIndex) {
          setItems((items) => ({
            ...items,
            [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
          }));
        }
    
        setActiveId(null);
      }
}

export default Board