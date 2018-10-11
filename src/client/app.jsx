import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from 'react-bulma-components/lib/components/image';
import Level from 'react-bulma-components/lib/components/level';
import Panel from 'react-bulma-components/lib/components/panel';
import Section from 'react-bulma-components/lib/components/section';
import { Control, Input } from 'react-bulma-components/lib/components/form';
import logo from './static/images/sparta.png';
import { TaskList } from './component/task-list';

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
    // TODO multilanguage
    render() {
        const { tasks } = this.state;
        return (
            <Section>
                <Panel.Header>
                    <Level renderAs="nav">
                        <Level.Side align="left">
                            <Level.Item>
                                <Image size={32} alt="32x32" src={logo} />
                            </Level.Item>
                            <Level.Item>
                                This is Spartaaa!!!
                            </Level.Item>
                        </Level.Side>
                    </Level>
                </Panel.Header>
                <Panel.Block>
                    <Control>
                        {/* TODO remove `readOnly` */}
                        <Input size="small" type="text" placeholder="search" readOnly />
                    </Control>
                </Panel.Block>
                <Panel.Tabs className="panel-tabs">
                    <Panel.Tabs.Tab active>Next</Panel.Tabs.Tab>
                    <Panel.Tabs.Tab>All</Panel.Tabs.Tab>
                </Panel.Tabs>
                <TaskList tasks={tasks} />
            </Section>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('App'));
