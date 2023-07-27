import {
  Button,
  Center,
  ChakraProvider,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    window.electron.ipcRenderer.once('logged', () => {
      navigate('/main');
    });
  }, []);

  const handleSubmit = () => {
    // const { value: username } = document.getElementById(
    //   'username'
    // ) as HTMLInputElement;
    // const { value: password } = document.getElementById(
    //   'password'
    // ) as HTMLInputElement;

    // window.electron.ipcRenderer.sendMessage('login', { username, password });
    window.electron.ipcRenderer.sendMessage('login', {
      username: 'alpiona',
      password: 'alpaalpa',
    });
  };

  return (
    <ChakraProvider>
      <Center bgColor="blackAlpha.900" height="100vh" width="100vw">
        <VStack textColor="gray.300" gap={7} py="100px">
          <VStack gap={0}>
            <Text as="b" fontSize={60} height="auto">
              OPPAIMAN
            </Text>
            <Text as="b" fontSize={60} height="auto">
              LAUNCHER
            </Text>
          </VStack>

          <Spacer />

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
            LOGIN
          </Button>
          <Text>Sign-up</Text>
        </VStack>
      </Center>
    </ChakraProvider>
  );
}
