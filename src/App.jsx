import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ListPage from './pages/ListPage';
import CategoryPage from './pages/CategoryPage';
import MenuPage from './pages/MenuPage';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import { useSelector } from 'react-redux';

function App() {

  const { user } = useSelector(state => state.user);

  return (
    <>
      <Routes>
        <Route element={<RequireAuth />}>

          <Route path={"/"} element={<Layout />}>
            <Route index element={user?.id !== 666 ? <HomePage /> : <Navigate to="/menu" />} />
            <Route path="/list" element={<ListPage />} />
            <Route path="/list/:id" element={<ListPage />} />

            <Route path='/menu' element={user?.id == 666 ? <MenuPage /> : <Navigate to="/" />} />
            <Route path="/menu/category/:id" element={user?.id == 666 ? <CategoryPage /> : <Navigate to="/" />} />

          </Route>

        </Route>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

      </Routes>
    </>
  )
}

export default App
