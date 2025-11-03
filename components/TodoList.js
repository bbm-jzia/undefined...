import React from 'react'
import {
  VStack,
  Text,
  Spinner,
  useColorModeValue
} from '@chakra-ui/react'
import TodoItem from './TodoItem'

const TodoList = ({ todos, toggleTodo, deleteTodo, isLoading }) => {
  const emptyTextColor = useColorModeValue('gray.500', 'gray.400')
  
  if (isLoading) {
    return (
      <VStack spacing={4} align="center" py={10}>
        <Spinner size="xl" color="purple.500" thickness="4px" />
        <Text>Loading your todos...</Text>
      </VStack>
    )
  }
  
  if (todos.length === 0) {
    return (
      <VStack spacing={4} py={10}>
        <Text fontSize="lg" color={emptyTextColor}>
          No todos yet. Add one to get started!
        </Text>
      </VStack>
    )
  }
  
  return (
    <VStack spacing={4} align="stretch">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </VStack>
  )
}

export default TodoList