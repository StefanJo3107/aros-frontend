import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Stfn1 from "../public/stfnnn.svg";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import StackedWaves from "../public/stacked-waves-haikei.png";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
    return (
        <Box className={styles.container}>
            <Navbar />
            <Hero />
        </Box>
    );
};

export default Home;
