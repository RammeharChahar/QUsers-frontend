import './App.css';
import Teams from './components/Teams';
import UserList from './components/UserList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
         <Route path="/" element={ <UserList />} />
         <Route path="/team" element={<Teams/>} />
       </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
