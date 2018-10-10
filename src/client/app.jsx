import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './static/images/sparta.png';
import { TaskList } from './task-list';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }
    componentDidMount() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then((tasks) => {
                console.log(tasks);
                return tasks;
            })
            .then(tasks => this.setState({ tasks }));
    }
    render() {
        const { tasks } = this.state;
        return (
            <div>
                This is Spartaaa!!!
                <img src={logo} />
                <TaskList tasks={tasks} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
