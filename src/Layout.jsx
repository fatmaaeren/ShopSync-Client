import React from 'react'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Modal from './components/Modal';

function Layout() {

    const { open: isModalOpen } = useSelector(state => state.modal);

    return (
        <main className='lg:px-16 lg:py-4  flex flex-col min-h-screen font-sans'>
            {
                isModalOpen && <Modal />
            }
            <Header />
            <Outlet />
        </main>

    )
}

export default Layout