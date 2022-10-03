import { Container } from "@mui/material";
import React, { FC, PropsWithChildren } from "react";

const BaseLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="sm" sx={{
      background: '#f7fbef',
      minHeight: "80vh",
      marginTop: 10
    }}>
      {children}
    </Container>
  )
};

export default BaseLayout;