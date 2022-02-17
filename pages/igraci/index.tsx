import { Box } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import IgracContent from "../../components/Igrac/IgracContent";
import Navbar from "../../components/Navbar/Navbar";
import styles from "../../styles/Turnir.module.css";

type Props = {
    locations: Location[];
    igraci: Igrac[];
};

type Location = {
    id: number;
    naziv: string;
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

const index = (props: Props) => {
    return (
        <Box className={styles.container}>
            <Navbar locations={props.locations} />
            <IgracContent igraci={props.igraci} locations={props.locations} />
        </Box>
    );
};

export async function getServerSideProps() {
    const locations = await axios.get("http://localhost:1207/lokacija");
    const igraci = await axios.get("http://localhost:1207/sahista");

    for (let i = 0; i < igraci.data.length; i++) {
        igraci.data[i].lokacija = locations.data.filter(
            (l: Location) => l.id == igraci.data[i].lokacija_id
        )[0].naziv;
    }

    return {
        props: {
            locations: locations.data,
            igraci: igraci.data,
        },
    };
}

export default index;
