// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, ModalsProvider } from 'src/providers';

import { AppRouter } from './AppRouter';

export function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <ModalsProvider>
            <AppRouter />
          </ModalsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
