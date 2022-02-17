import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Image,
    Table,
    TableCaption,
    Tbody,
    Td,
    Text,
    Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import {
    AiFillBackward,
    AiFillCaretLeft,
    AiFillCaretRight,
    AiFillForward,
    AiOutlineTrophy,
} from "react-icons/ai";
import { BiFirstPage } from "react-icons/bi";
import { GiChessKing } from "react-icons/gi";
import { FcPrevious } from "react-icons/fc";
type Props = {
    partija: Partija;
};

type Partija = {
    partija_id: number;
    beli: Igrac;
    crni: Igrac;
    pgn: string;
    rezultat: string;
    otvaranje: string;
    datum: string;
    turnir: Turnir;
    runda: number;
};

type Igrac = {
    sahista_id: number;
    ime: string;
    prezime: string;
    elo: number;
    titula_fide: string;
    lokacija_id: number;
    sahista_slika: string;
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija_id: number;
    turnir_slika: string;
};

const ChessGame = (props: Props) => {
    let fens = props.partija.pgn.split("\n");
    let [index, setIndex] = useState(0);
    let fensTable = fens.map((f, i) => {
        return (
            <Tr
                key={f}
                color={index == i ? "orange.200" : "white"}
                fontWeight={index == i ? "bold" : "normal"}
            >
                <Td>{i + 1}</Td>
                <Td>{f}</Td>
            </Tr>
        );
    });

    return (
        <Flex justifyContent="space-evenly">
            <Box mt={4}>
                <Flex mb={2}>
                    <Image
                        src={props.partija.crni.sahista_slika}
                        w={10}
                        h={10}
                        objectFit="cover"
                        borderRadius="5px"
                        mr={2}
                        mt={1}
                    />
                    <Box>
                        <Text fontWeight="bold">
                            {props.partija.crni.ime +
                                " " +
                                props.partija.crni.prezime}
                        </Text>
                        <Text color="gray.400">
                            {"ELO: " + props.partija.crni.elo}
                        </Text>
                    </Box>
                </Flex>
                <Chessboard
                    position={fens[index]}
                    arePiecesDraggable={false}
                    customBoardStyle={{ borderRadius: "10px" }}
                    showBoardNotation={false}
                />
                {/* <Button
                onClick={() => {
                    setIndex(--index);
                }}
            >
                {"<"}
            </Button>
            <Button
                onClick={() => {
                    setIndex(++index);
                }}
            >
                {">"}
            </Button> */}

                <Flex mt={2}>
                    <Image
                        src={props.partija.beli.sahista_slika}
                        w={10}
                        h={10}
                        objectFit="cover"
                        borderRadius="5px"
                        mr={2}
                        mt={1}
                    />
                    <Box>
                        <Text fontWeight="bold">
                            {props.partija.beli.ime +
                                " " +
                                props.partija.beli.prezime}
                        </Text>
                        <Text color="gray.400">
                            {"ELO: " + props.partija.beli.elo}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Box
                backgroundColor="gray.900"
                borderRadius="xl"
                boxShadow="dark-lg"
                w="40rem"
                mt={4}
                mb={4}
            >
                <Flex
                    justifyContent="space-between"
                    p={2}
                    pb={0}
                    pl={4}
                    pr={4}
                    color="gray.500"
                >
                    <Text>{props.partija.datum}</Text>
                    <Text>Runda {props.partija.runda}</Text>
                </Flex>
                <Grid
                    mt={4}
                    justifyItems="center"
                    alignContent="center"
                    alignItems="center"
                    templateColumns="repeat(5,1fr)"
                    m="auto"
                    gap={4}
                    p={4}
                >
                    <GridItem colSpan={2}>
                        <Text
                            fontSize="2xl"
                            textAlign="center"
                            fontWeight="bold"
                            color="orange.200"
                        >
                            {props.partija.beli.ime +
                                " " +
                                props.partija.beli.prezime}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Text
                            fontSize="2xl"
                            textAlign="center"
                            fontWeight="bold"
                            color="orange.200"
                        >
                            {props.partija.rezultat}
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Text
                            fontSize="2xl"
                            textAlign="center"
                            fontWeight="bold"
                            color="orange.200"
                        >
                            {props.partija.crni.ime +
                                " " +
                                props.partija.crni.prezime}
                        </Text>
                    </GridItem>
                </Grid>
                <Flex pl={8} mt={2}>
                    <Icon
                        as={AiOutlineTrophy}
                        w={12}
                        h={12}
                        backgroundColor="gray.700"
                        borderRadius="50%"
                        fill="orange.200"
                        p={2}
                    />
                    <Text fontSize="xl" mt={2} ml={2}>
                        <Text display="inline" color="orange.200">
                            Turnir:
                        </Text>{" "}
                        {props.partija.turnir.turnir_naziv}
                    </Text>
                </Flex>
                <Flex pl={8} mt={2}>
                    <Icon
                        as={GiChessKing}
                        w={12}
                        h={12}
                        backgroundColor="gray.700"
                        borderRadius="50%"
                        fill="orange.200"
                        p={2}
                    />
                    <Text fontSize="xl" mt={2} ml={2}>
                        <Text display="inline" color="orange.200">
                            Otvaranje:
                        </Text>{" "}
                        {props.partija.otvaranje}
                    </Text>
                </Flex>
                <Text ml={8} mt={4} mb={2} fontSize="xl" color="orange.200">
                    FENs:
                </Text>
                <Box
                    w="36rem"
                    h="16.5rem"
                    overflow="scroll"
                    overflowX="hidden"
                    borderRadius={8}
                    ml="2rem"
                    pb="0"
                >
                    <Table
                        variant="striped"
                        colorScheme="orange"
                        w="36rem"
                        fontSize="xs"
                        overflow="auto"
                    >
                        <Tbody>{fensTable}</Tbody>
                    </Table>
                </Box>
                <Flex justifyContent="center" mt={4}>
                    <IconButton
                        as={AiFillBackward}
                        colorScheme="orange"
                        aria-label="first"
                        color="orange.500"
                        w={12}
                        h={12}
                        mr={2}
                        onClick={() => {
                            setIndex(-1);
                        }}
                    />

                    <IconButton
                        as={AiFillCaretLeft}
                        colorScheme="orange"
                        aria-label="previous"
                        color="orange.500"
                        w={12}
                        h={12}
                        mr={2}
                        onClick={() => {
                            if (index - 1 >= -1) setIndex(--index);
                            else setIndex(-1);
                        }}
                    />
                    <IconButton
                        as={AiFillCaretRight}
                        colorScheme="orange"
                        aria-label="next"
                        color="orange.500"
                        w={12}
                        h={12}
                        mr={2}
                        onClick={() => {
                            if (index + 1 < fens.length - 1) setIndex(++index);
                            else setIndex(fens.length - 1);
                        }}
                    />

                    <IconButton
                        as={AiFillForward}
                        colorScheme="orange"
                        aria-label="last"
                        color="orange.500"
                        w={12}
                        h={12}
                        onClick={() => {
                            setIndex(fens.length - 1);
                        }}
                    />
                </Flex>
            </Box>
        </Flex>
    );
};

export default ChessGame;
