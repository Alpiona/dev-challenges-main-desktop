import {
  Button,
  Center,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

export default function SignUp() {
  const handleSubmit = () => {
    const { value: username } = document.getElementById(
      'username'
    ) as HTMLInputElement;
    const { value: password } = document.getElementById(
      'password'
    ) as HTMLInputElement;
    const { value: email } = document.getElementById(
      'email'
    ) as HTMLInputElement;

    // window.electron.ipcRenderer.sendMessage('login', { username, password });
    window.electron.ipcRenderer.sendMessage('register', {
      username,
      password,
      email,
    });
  };

  return (
    <ChakraProvider>
      <Center bgColor="blackAlpha.900" height="100vh" width="100vw">
        <VStack textColor="gray.300" gap={7} py="100px">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              id="username"
              borderColor="gray.800"
              bgColor="black"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              id="email"
              type="email"
              borderColor="gray.800"
              bgColor="black"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              id="password"
              borderColor="gray.800"
              bgColor="black"
              type="password"
              required
            />
          </FormControl>
          <Button
            bgColor="red.500"
            textColor="gray.300"
            width="250px"
            height="60px"
            fontSize={24}
            onClick={() => handleSubmit()}
          >
            REGISTER
          </Button>
          <Link as={ReactRouterLink} to="/">
            <Text>Login</Text>
          </Link>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}
