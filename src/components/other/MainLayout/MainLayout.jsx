import React from 'react';
import Banner from '../Banner/Banner';

export default function MainLayout({ children }) {
  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {children}
          </div>
        </div>
      </main>
    </>
  )
}