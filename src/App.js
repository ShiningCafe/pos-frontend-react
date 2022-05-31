import logo from './logo.svg';
import './App.css';
import { Button } from 'flowbite-react'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button
          outline={true}
          gradientDuoTone="purpleToBlue"
        >
          Purple to Blue
        </Button>
        <p>123{localStorage.getItem('color-theme') || '123'}</p>
      </header>
    </div>
  );
}

export default App;
