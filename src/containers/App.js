import React, {Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
//  import {robots} from './robots';
import './App.css';

class App extends Component {
    constructor(){
        super();
        this.state = {
            //robots: robots,

            robots: [],
            searchfield: ''
        }

    }

    // fetch data form on9 api
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => this.setState({ robots: users}));
        //.then(users => {});
    }
    

    onSearchChange = (event) => {
        // set search field value
        this.setState({ searchfield: event.target.value})
    }

    render() {

        // destructure
        const { robots, searchfield } = this.state;

        // return search array
        const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        })

        // if loading to long,return loading msg
        return !robots.length ?
          <h1>Loading</h1> :  
        (   
            <div className='tc'>
                <h1 className='f1'>RoboFriends Awantech </h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>                   
            </div>
        );
        
    }
}

export default App;