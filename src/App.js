import { Routes, Route }  from 'react-router-dom'
import Layout from './components/Layout';
import TestPage from './pages/test'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TestPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
