// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';

import { AppRouter } from '../AppRouter';

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
