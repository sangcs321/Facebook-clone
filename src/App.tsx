
import './App.css';
import LanguageManage from './Pages/Language/LanguageManage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Pages/Facebook/Home/HomeScreen';
import Login from './Pages/Facebook/Login/Login';
import Register from './Pages/Facebook/Register/Register';
import Profile from './Pages/Facebook/Profile/Profile';
import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store';
import AppRoutes from './Routes';

function App() {

  // const store = createStore(rootReducer)

  return (
    <Provider store={store}>
      <BrowserRouter>
          <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
