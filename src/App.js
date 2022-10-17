import { Routes, Route } from "react-router-dom";
import AddTask from "./Components/AddTask";
import EditTask from "./Components/EditTask";
import DeleteTask from "./Components/DeleteTask";
import Error404 from "./Components/Error404";
import Home from "./Components/Home";
import Login from "./Components/Login";
import RequireUser from "./Components/RequireUser";
import Signup from "./Components/Signup";
import "./style.scss";
import SortTasks from "./Components/SortTasks";
import Tables from "./Components/Tables";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireUser>
            <Home />
          </RequireUser>
        }
      >
        <Route path="add" element={<AddTask />} />
        <Route path="edit" element={<EditTask />} />
        <Route path="delete" element={<DeleteTask />} />
        <Route path="sort" element={<SortTasks />} />
        <Route path="tables" element={<Tables />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
