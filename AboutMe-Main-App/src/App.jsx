import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "../src/Components_Container/MainComponents/HomePage.jsx";
 function App() {
  return (
    <>
      <BrowserRouter basename="/PersonalProyect-Main">
   
        <Routes>
          <Route path="/" element={<Homepage />} />
         </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
