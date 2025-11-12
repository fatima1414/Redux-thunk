import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskList />}></Route>
         <Route path="/taskAdd" element={<TaskForm />}></Route>
         <Route path="/updateTask/:id" element={<TaskForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
