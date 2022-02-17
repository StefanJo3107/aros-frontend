import {
    Box,
    Grid,
    GridItem,
    Icon,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TurnirCard from "./TurnirCard";
import { BiSearchAlt2 } from "react-icons/bi";

type Props = {
    turniri: Turnir[];
    locations: Location[];
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija: string;
    turnir_slika: string;
};

type Location = {
    id: number;
    naziv: string;
};

const TurnirContent = (props: Props) => {
    const [turniri, setTurniri] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value);

    useEffect(() => {
        let sortirani = props.turniri.sort((a, b) => {
            return a.turnir_naziv > b.turnir_naziv ? 1 : -1;
        });
        let t: any = sortirani.map((turnir, i) => {
            if (turnir.turnir_naziv.toLowerCase().includes(searchInput))
                return (
                    <GridItem key={turnir.turnir_naziv}>
                        <TurnirCard
                            turnir={turnir}
                            locations={props.locations}
                        />
                    </GridItem>
                );
        });

        setTurniri(t);
    }, [searchInput]);

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
                Turniri
            </Text>

            <Grid
                mt={4}
                justifyItems="center"
                templateColumns="repeat(4,1fr)"
                gap={8}
                w="85vw"
                m="auto"
                mr={28}
            >
                <GridItem
                    as={InputGroup}
                    ml={6}
                    pr={12}
                    colSpan={4}
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

                {turniri}
            </Grid>
        </Box>
    );
};

export default TurnirContent;
