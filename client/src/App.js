import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar      from './components/NavBar';
import HomePage    from './pages/HomePage';
import SignInPage  from './pages/SignInPage';
import SignUpPage  from './pages/SignUpPage';
import AccountPage from './pages/AccountPage';
import OrdersPage  from './pages/OrdersPage';
import EventPage   from './pages/EventPage';
import CartPage    from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/signin"    element={<SignInPage />} />
        <Route path="/signup"    element={<SignUpPage />} />
        <Route path="/account"   element={<AccountPage />} />
        <Route path="/orders"    element={<OrdersPage />} />
        <Route path="/events/:id" element={<EventPage />} />
        <Route path="/cart"      element={<CartPage />} />
        <Route path="/success"   element={<SuccessPage />} />
        <Route path="/"          element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
