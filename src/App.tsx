import React from 'react';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
export function App() {
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>;
}