import React from 'react';
import Page, { ThemeProvider } from './app/page.tsx';

function App() {
  // ThemeProvider now manages the theme and background colors.
  // This is a cleaner approach than styling a div here.
  return (
    <ThemeProvider>
      <Page />
    </ThemeProvider>
  );
}

export default App;