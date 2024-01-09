import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import V2 from 'pages/V2';
import V3 from 'pages/V3';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainPage />} />
        <Route path="/v2" element={<V2 />} />
        <Route path="/v3" element={<V3 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
