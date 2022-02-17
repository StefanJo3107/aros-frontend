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
import IgracCard from "./IgracCard";
import { BiSearchAlt2 } from "react-icons/bi";
import UpdateIgrac from "./UpdateIgrac";

type Props = {
    igraci: Igrac[];
    locations: Lokacija[];
};

type Igrac = {
    sahista_id: number;
    ime: string;
    prezime: string;
    elo: number;
    titula_fide: string;
    lokacija: string;
    sahista_slika: string;
};

type Lokacija = {
    id: number;
    naziv: string;
};

const IgracContent = (props: Props) => {
    const [igraci, setIgraci] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setSearchInput(e.target.value);

    useEffect(() => {
        let igraciSortirano = props.igraci.sort((a, b) =>
            a.elo > b.elo ? -1 : 1
        );
        let igr: any = igraciSortirano.map((igrac) => {
            if (
                `${igrac.ime.toLowerCase()} ${igrac.prezime.toLowerCase()}`.includes(
                    searchInput
                )
            )
                return (
                    <GridItem key={igrac.sahista_id}>
                        <IgracCard
                            key={igrac.sahista_id}
                            igrac={igrac}
                            locations={props.locations}
                        />
                    </GridItem>
                );
        });

        setIgraci(igr);
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
                Igrači
            </Text>

            <Grid
                mt={4}
                justifyItems="center"
                templateColumns="repeat(4,1fr)"
                gap={4}
                rowGap={8}
                w="85vw"
                m="auto"
            >
                <GridItem
                    as={InputGroup}
                    ml={6}
                    colSpan={4}
                    pr={14}
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
                {igraci}
            </Grid>
        </Box>
    );
};

export default IgracContent;
