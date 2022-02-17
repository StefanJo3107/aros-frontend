import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import PartijaContent from "../../components/Partija/PartijaContent";
import styles from "../../styles/Turnir.module.css";

type Props = {
    turniri: Turnir[];
    igraci: Igrac[];
    lokacije: Lokacija[];
    partije: Partija[];
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

const index = (props: Props) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Box className={styles.container}>
            <Navbar locations={props.lokacije} />
            <PartijaContent
                turniri={props.turniri}
                igraci={props.igraci}
                partije={props.partije}
            />
        </Box>
    );
};

export async function getServerSideProps() {
    const turniri = await axios.get("http://localhost:1207/turnir");
    const igraci = await axios.get("http://localhost:1207/sahista");
    const partije = await axios.get("http://localhost:1207/partija");
    const lokacije = await axios.get("http://localhost:1207/lokacija");

    for (let i = 0; i < partije.data.length; i++) {
        partije.data[i].beli = igraci.data.filter(
            (igrac: Igrac) => igrac.sahista_id == partije.data[i].beli_id
        )[0];

        partije.data[i].crni = igraci.data.filter(
            (igrac: Igrac) => igrac.sahista_id == partije.data[i].crni_id
        )[0];

        partije.data[i].turnir = turniri.data.filter(
            (turnir: Turnir) => turnir.turnir_id == partije.data[i].turnir_id
        )[0];
    }

    return {
        props: {
            turniri: turniri.data,
            igraci: igraci.data,
            lokacije: lokacije.data,
            partije: partije.data,
        },
    };
}
export default index;
