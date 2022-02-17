import {
    Button,
    Flex,
    Icon,
    Text,
    Link,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { AppProps } from "next/dist/shared/lib/router/router";
import NextLink from "next/link";
import React, { useState } from "react";
import { FaChess } from "react-icons/fa";
import CreateIgrac from "../Igrac/CreateIgrac";
import CreateTurnir from "../Turnir/CreateTurnir";

type Props = {
    locations: Location[];
};

type Location = {
    id: number;
    naziv: string;
};

const Navbar = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isTurnir, setTurnir] = useState(false);
    return (
        <>
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
                <Flex ml={32}>
                    <NextLink href="/turniri">
                        <Button colorScheme="orange" variant="ghost" mr={4}>
                            Turniri
                        </Button>
                    </NextLink>
                    <NextLink href="/igraci">
                        <Button colorScheme="orange" variant="ghost" mr={4}>
                            Igrači
                        </Button>
                    </NextLink>
                    <NextLink href="/partije">
                        <Button colorScheme="orange" variant="ghost">
                            Partije
                        </Button>
                    </NextLink>
                </Flex>
                <Flex>
                    <Button
                        colorScheme="orange"
                        onClick={() => {
                            onOpen();
                            setTurnir(true);
                        }}
                    >
                        Kreiraj turnir
                    </Button>
                    <Button
                        colorScheme="orange"
                        ml={4}
                        onClick={() => {
                            onOpen();
                            setTurnir(false);
                        }}
                    >
                        Dodaj igrača
                    </Button>
                </Flex>
            </Flex>

            {isTurnir ? (
                <CreateTurnir
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    locations={props.locations}
                />
            ) : (
                <CreateIgrac
                    locations={props.locations}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                />
            )}
        </>
    );
};

export default Navbar;
