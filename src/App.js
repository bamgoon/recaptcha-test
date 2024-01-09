import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import V2 from 'pages/V2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/v2" element={<V2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
