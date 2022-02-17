import {
    Box,
    Button,
    Grid,
    GridItem,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import PartijaCard from "./PartijaCard";
import CreatePartija from "./CreatePartija";

type Props = {
    partije: Partija[];
    turniri: Turnir[];
    igraci: Igrac[];
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

const PartijaContent = (props: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [partije, setPartije] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value);

    useEffect(() => {
        let partijeSorted = props.partije.sort((a, b) =>
            a.datum > b.datum ? -1 : 1
        );
        let part: any = partijeSorted.map((partija) => {
            if (
                `${partija.beli.ime} ${partija.beli.prezime} ${partija.crni.ime} ${partija.crni.prezime} ${partija.turnir.turnir_naziv} ${partija.otvaranje}`
                    .toLowerCase()
                    .includes(searchInput)
            )
                return (
                    <GridItem>
                        <PartijaCard partija={partija} igraci={props.igraci} />
                    </GridItem>
                );
        });

        setPartije(part);
    }, [searchInput, props.partije]);

    return (
        <Box mb={8}>
            <Text
                fontSize="4xl"
                fontWeight="bold"
                textAlign="center"
                mt={8}
                bgGradient="linear(to-l, #FBD38D, #F6AD55)"
                bgClip="text"
                mb={6}
            >
                Partije
            </Text>

            <Grid
                mt={4}
                justifyItems="center"
                templateColumns="repeat(3,1fr)"
                gap={4}
                rowGap={8}
                w="85vw"
                m="auto"
            >
                <GridItem
                    as={InputGroup}
                    w="2xl"
                    ml={6}
                    colSpan={2}
                    justifySelf="flex-start"
                >
                    <InputLeftElement
                        pointerEvents="none"
                        children={<Icon as={BiSearchAlt2} w={6} h={6} />}
                    />
                    <Input
                        type="search"
                        placeholder="Pretraži po imenu"
                        onChange={handleSearchChange}
                    />
                </GridItem>
                <GridItem justifySelf="flex-end" mr={4}>
                    <Button colorScheme="orange" w={56} onClick={onOpen}>
                        Dodaj partiju
                    </Button>
                </GridItem>
                {partije}
            </Grid>
            <CreatePartija
                turniri={props.turniri}
                igraci={props.igraci}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            />
        </Box>
    );
};

export default PartijaContent;
