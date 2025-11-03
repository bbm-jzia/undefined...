import React from 'react'
import {
  Checkbox,
  Card,
  CardBody,
  Text,
  HStack,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
  const cardBg = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.800', 'white')
  
  return (
    <Card bg={cardBg} boxShadow="md" borderRadius="lg">
      <CardBody>
        <HStack justifyContent="space-between">
          <Checkbox
            isChecked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
            colorScheme="green"
            size="lg"
          >
            <Text
              color={textColor}
              textDecoration={todo.completed ? 'line-through' : 'none'}
              opacity={todo.completed ? 0.7 : 1}
              fontWeight={todo.completed ? 'normal' : 'medium'}
              fontSize="lg"
            >
              {todo.title}
            </Text>
          </Checkbox>
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            variant="ghost"
            onClick={() => deleteTodo(todo.id)}
            aria-label="Delete todo"
          />
        </HStack>
      </CardBody>
    </Card>
  )
}

export default TodoItem