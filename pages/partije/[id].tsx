import { Box } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ChessGame from "../../components/Partija/ChessGame";
import styles from "../../styles/Turnir.module.css";

type Props = {
    lokacije: Lokacija[];
    partija: Partija;
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

type Lokacija = {
    id: number;
    naziv: string;
};

type Turnir = {
    turnir_id: number;
    turnir_naziv: string;
    turnir_datum: string;
    broj_rundi: number;
    lokacija_id: number;
    turnir_slika: string;
};
const Game = (props: Props) => {
    return (
        <Box className={styles.container}>
            <Navbar locations={props.lokacije} />
            <ChessGame partija={props.partija} />
        </Box>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { id } = context.params;
    const partija = await axios.get("http://localhost:1207/partija/" + id);
    const turnir = await axios.get(
        "http://localhost:1207/turnir/" + partija.data.turnir_id
    );
    const beli = await axios.get(
        "http://localhost:1207/sahista/" + partija.data.beli_id
    );
    const crni = await axios.get(
        "http://localhost:1207/sahista/" + partija.data.crni_id
    );
    const lokacije = await axios.get("http://localhost:1207/lokacija");

    partija.data.beli = beli.data;
    partija.data.crni = crni.data;
    partija.data.turnir = turnir.data;

    return {
        props: {
            lokacije: lokacije.data,
            partija: partija.data,
        },
    };
};
export default Game;
