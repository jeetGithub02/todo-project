
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DelateTask from './components/DelateTask';
import EditTask from './components/EditTask';
import AddTask from './components/AddTask';

function App() {
  return (
    <div className="appPage">
        <div className="shadePage">
            <BrowserRouter>
              <div className="container">
                        <header>
                              <h1 className="text-center text-white">TO-DO APP</h1>
                              <p className="text-white text-center fs-5 fw-medium">Your Appointments</p>
                        </header>
                        <section className="mt-4">
                          <div>
                              <Routes>
                                  <Route path="/" element={<Home/>} />
                                  <Route path="login" element={<Login/>} />
                                  <Route path='register' element={<Register/>} />
                                  <Route path="dashboard"  element={<Dashboard/>} />
                                  <Route path="delete-task/:id" element={<DelateTask/>} />
                                  <Route path="edit-task/:id" element={<EditTask/>} />
                                  <Route path="add-task" element={<AddTask/>} />
                              </Routes>
                          </div>
                        </section>
              </div>
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
