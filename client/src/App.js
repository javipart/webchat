import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Agent from './pages/Agent';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/agent" component={Agent} />
      <Route exact path="/" component={Index} />
    </BrowserRouter>
  );
}

export default App;
