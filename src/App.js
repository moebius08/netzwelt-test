import {BrowserRouter,Routes,Route, HashRouter} from 'react-router-dom';
import Homepage from './pages/homepage'
import Login from './pages/login';
import ProtectedRoutes from './components/ProtectedRoutes';
import PublicRoute from './components/PublicRoutes';

function App() {
  return (
    <HashRouter>
        <Routes>
      <Route path='/' element={<ProtectedRoutes> <Homepage /> </ProtectedRoutes>} />
      <Route path='/Account/Login' element={<PublicRoute><Login /></PublicRoute>}/>
      </Routes>
    </HashRouter>
    );
}

export default App;
