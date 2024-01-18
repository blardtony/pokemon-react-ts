import PokemonPage from '@pages/pokemon/pokemon-list.page';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <div>Page non trouvée</div>,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <PokemonPage />,
      },
    ],
  },
]);
export default router;
