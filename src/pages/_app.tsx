import type { AppProps } from "next/app";
import { theme } from "../shared";
import { ChakraProvider } from "@chakra-ui/react";
import NextNProgress from "nextjs-progressbar";
import "../shared/iconMoon/style.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NextNProgress color="#ff6f00" height={6} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
