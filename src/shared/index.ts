import { extendTheme, StyleFunctionProps } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import "@fontsource/montserrat";

export const theme = extendTheme({
    fonts: {
        body: 'Montserrat',
    },
    styles: {
        global: (props: StyleFunctionProps) => ({
            html: {
                fontSize: '16px',
            },
            body: {
                color: 'black',
                bgColor: '#F9F9F9',

            },
            '*::placeholder': {
                opacity: 1,
                color: 'muted',
            },
            '*, *::before, &::after': {
                borderColor: mode('gray.200', 'gray.800')(props),
            },

            a: {
                _hover: {
                    textDecor: 'none',
                },
            },
            input: {
                borderRadius: "0 !important",
            },
            select: {
                padding: "0 !important",
            },
            label: {
                margin: "0 !important",
            },
            // disable hover all button in chakra
            '.chakra-button': {
                _hover: {
                    bg: "blue !important",
                },
            },
            '.chakra-radio__control': {
                borderColor: "#2A59FE !important",
                margin: "2px !important",
                "&:before": {
                    color: "white !important",
                    bg: "blue !important",
                    border: "1px white solid !important",
                    padding: "2px !important",
                    margin: "0 !important",

                },
            },
            '.chakra-checkbox__control': {
                borderColor: "#2A59FE !important",
            },
            '.customScroll': {
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "white",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#C4C4C4",
                    borderRadius: "2px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#A3A3A3",
                },
            },
        }),
    },
    breakpoints: {
        xs: '320px',
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1440px',
        xxl: '1600px',
    },
});
