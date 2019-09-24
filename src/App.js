// Import react and the component class
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Results from './Results'
import CreateNew from './createNew'



class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path='/results/:id' component={Results} />
                    <Route path="/createNew" component={CreateNew}/>
                  </Switch>
                </div>
            </Router>
        )
    }
};

// Export the App component
export default App;