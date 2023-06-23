import React from 'react';
import {Text} from "@nextui-org/react";
import Container from "react-bootstrap/Container";

export default function Home() {
    return (
        <>
            <Container style={{minHeight: "20vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Text h1 size={60} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%",}} weight="bold">
                    Discover&nbsp;
                </Text>
                <Text h1 size={60} css={{textGradient: "45deg, $purple600 -20%, $pink600 100%",}} weight="bold">
                    our task&nbsp;
                </Text>
                <Text h1 size={60} css={{textGradient: "45deg, $yellow600 -20%, $red600 100%",}} weight="bold">
                    manager
                </Text>
            </Container>
            <Container>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/biiFn1fER4A"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>
            </Container>
        </>
    );
}
