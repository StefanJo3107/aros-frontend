import { Button, Flex, Icon, Text, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { FaChess } from "react-icons/fa";

type Props = {};

const Navbar = (props: Props) => {
    return (
        <Flex justify="space-between" mt={4} ml={4} mr={4}>
            <Flex>
                <Icon as={FaChess} w={8} h={8} color="orange" />
                <NextLink href="/">
                    <Text
                        as={Link}
                        fontSize="xl"
                        ml={2}
                        color="orange.200"
                        fontWeight="extrabold"
                        mt={1}
                        bgGradient="linear(to-l, #FBD38D, #F6AD55)"
                        bgClip="text"
                    >
                        Fianchetto
                    </Text>
                </NextLink>
            </Flex>
            <Flex>
                <NextLink href="/turnir">
                    <Button colorScheme="orange" variant="ghost" mr={4}>
                        Turniri
                    </Button>
                </NextLink>
                <Button colorScheme="orange" variant="ghost" mr={4}>
                    Igrači
                </Button>
                <Button colorScheme="orange" variant="ghost">
                    Partije
                </Button>
            </Flex>
            <Flex>
                <Button colorScheme="orange">Kreiraj turnir</Button>
                <Button colorScheme="orange" ml={4}>
                    Dodaj igrača
                </Button>
            </Flex>
        </Flex>
    );
};

export default Navbar;
