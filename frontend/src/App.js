
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Student from "./Components/Student"
import StudentForm from './Components/Student/StudentForm';
// import {BrowserRouter} from 'react-ro'
import { BrowserRouter,Route ,Routes} from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" index element={ <Student /> } />
        <Route path="/AddData" element={ <StudentForm /> } />
        <Route path="/UpdateData" element={ <StudentForm /> } />
        <Route path="/contact" element={<h2>contact</h2>  } />

      </Routes>
    
      </BrowserRouter>
    </div>
  );
}

export default App;
