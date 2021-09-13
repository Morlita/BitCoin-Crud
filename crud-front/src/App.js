import Navbar from './Components/Navbar';
import MainCoin from './Components/MainCoin';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

function App() {

  

  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <main className='container'>
          <Switch>
            <Route path= '/' exact>
              <MainCoin />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
