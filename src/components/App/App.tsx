// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider, ModalsProvider } from 'src/providers';

import { AppRouter } from '../AppRouter';
import { VacancyRequestModal } from '../VacancyRequestModal';

export function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <AuthProvider>
          <ModalsProvider>
            <AppRouter />
            <VacancyRequestModal />
          </ModalsProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
