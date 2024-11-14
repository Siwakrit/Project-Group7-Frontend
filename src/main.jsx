
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './pages/Home';
import CardDetail from './components/Card-Detail/CardDetail';
import CheckOut from './pages/CheckOut';
import { CartProvider } from './components/Checkout/CartContext';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/card/:id",
    element: <CardDetail />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartProvider>
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
    </CartProvider>
  </StrictMode>
);
