import React from 'react';
import logo from './logo.svg';
import './App.css';
import { initializeApollo } from './config/initializeApollo';
import { ApolloProvider } from '@apollo/client';
import { ContactProvider } from './components/ContactProvider/ContactProvider';
import AppRoutes from './components/AppRoutes';
import { ThemeProvider } from '@mui/system';
import { theme } from './config/theme';

function App() {

  const client = initializeApollo();

  return (
    // <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <ContactProvider>
          <AppRoutes />
        </ContactProvider>
      </ApolloProvider>
    // </ThemeProvider>
  );
}

export default App;
