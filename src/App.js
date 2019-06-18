import React , {Component} from 'react';
import logo from './logo.svg';
import Main from './components/Main';
import Secret from './components/Secret';
import Callback from './components/Callback';
import NotFound from './components/NotFound';
import './App.css';

class App extends Component {
  render(){
    let mainComponent="";
    switch(this.props.location){
      case"":
      mainComponent = <Main {...this.props}/>
      break;
      case "callback":
        mainComponent = <Callback/>
        break;
        case "secret":
          mainComponent = this.props.auth.isAuthenticated()? (<Secret {...this.props}/>) : (<NotFound/>);
          break;
          default:
         mainComponent= <NotFound/>;
    }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
     
      </header>
{mainComponent}
    </div>
  );
}
}

export default App;
