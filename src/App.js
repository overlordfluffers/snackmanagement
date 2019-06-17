// Import react and the component class
import React, { Component } from 'react';
// Import BrowserRouter
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home'
import Results from './Results'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={Home} />
                    <Route exact path="/results" component={Results} />
                </div>
            </Router>
        )
    }
};

// Export the App component
export default App;