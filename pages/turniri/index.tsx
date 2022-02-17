import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import TurnirContent from "../../components/Turnir/TurnirContent";
import styles from "../../styles/Turnir.module.css";

type Props = {
    locations: Location[];
    turniri: Turnir[];
};

type Location = {
    id: number;
    naziv: string;
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija: string;
    turnir_slika: string;
};

const index = (props: Props) => {
    return (
        <Box className={styles.container}>
            <Navbar locations={props.locations} />
            <TurnirContent
                locations={props.locations}
                turniri={props.turniri}
            />
        </Box>
    );
};

export async function getServerSideProps() {
    const locations = await axios.get("http://localhost:1207/lokacija");
    const turniri = await axios.get("http://localhost:1207/turnir");

    for (let i = 0; i < turniri.data.length; i++) {
        turniri.data[i].lokacija = locations.data.filter(
            (l: Location) => l.id == turniri.data[i].lokacija_id
        )[0].naziv;
    }

    return {
        props: {
            locations: locations.data,
            turniri: turniri.data,
        },
    };
}

export default index;
