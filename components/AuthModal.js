import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { authHelpers } from '../lib/supabase'

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  
  const bgColor = useColorModeValue('white', 'gray.800')
  
  const handleSignUp = async () => {
    if (!email || !password || !name) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    try {
      setIsLoading(true)
      const user = await authHelpers.signUp(email, password, name)
      onLogin(user)
      toast({
        title: 'Account created',
        description: 'You have been signed up and logged in',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error signing up',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleSignIn = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      return
    }
    
    try {
      setIsLoading(true)
      const user = await authHelpers.signIn(email, password)
      onLogin(user)
      toast({
        title: 'Logged in',
        description: 'You have been logged in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Error signing in',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const resetForm = () => {
    setEmail('')
    setPassword('')
    setName('')
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent bg={bgColor}>
        <ModalHeader>Authentication</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed" onChange={resetForm}>
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Sign Up</Tab>
            </TabList>
            <TabPanels>
              {/* Login Panel */}
              <TabPanel>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                  </FormControl>
                  <Button 
                    colorScheme="purple" 
                    width="full" 
                    mt={4}
                    onClick={handleSignIn}
                    isLoading={isLoading}
                  >
                    Login
                  </Button>
                </VStack>
              </TabPanel>
              
              {/* Sign Up Panel */}
              <TabPanel>
                <VStack spacing={4}>
                  <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                    />
                  </FormControl>
                  <Button 
                    colorScheme="blue" 
                    width="full" 
                    mt={4}
                    onClick={handleSignUp}
                    isLoading={isLoading}
                  >
                    Sign Up
                  </Button>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AuthModal