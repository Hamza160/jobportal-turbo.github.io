"use client"
import React from 'react';
import {createTheme, MantineProvider} from "@mantine/core";

const theme = createTheme({})
const MantProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <MantineProvider theme={theme}>
        {children}
    </MantineProvider>
  );
}

export default MantProvider;
