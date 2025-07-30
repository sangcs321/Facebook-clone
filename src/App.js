
import './App.css';
import LanguageManage from './Screen/Language/LanguageManage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './Screen/Facebook/Home/HomeScreen';
import Login from './Screen/Facebook/Login/Login';
import Register from './Screen/Facebook/Register/Register';
import Profile from './Screen/Facebook/Profile/Profile';
import { Provider } from 'react-redux';
import { store } from './Redux/Store/Store.ts';

function App() {

  // const store = createStore(rootReducer)

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/languages" element={<LanguageManage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
