import { Box, Button, Center, Icon, Text, VStack } from '@chakra-ui/react';
import { AiFillHeart } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';

export default function SideNavbar() {
  return (
    <Box height="100vh" width="350px">
      <Center textColor="white" fontSize={30} height="100px">
        <Text as="b">LAUNCHER</Text>
      </Center>
      <VStack>
        <Button
          _hover={{ bgColor: 'none' }}
          bgColor="transparent"
          width="350px"
          height="80px"
          textColor="white"
          justifyContent="start"
          gap={4}
          fontSize={20}
        >
          <Icon as={BiWorld} boxSize={7} />
          <Text>Explore</Text>
        </Button>
        <Button
          _hover={{ bgColor: 'none' }}
          bgColor="transparent"
          width="350px"
          height="80px"
          textColor="white"
          justifyContent="start"
          gap={4}
          fontSize={20}
        >
          <Icon as={AiFillHeart} boxSize={7} />
          <Text>Library</Text>
        </Button>
      </VStack>
    </Box>
  );
}
