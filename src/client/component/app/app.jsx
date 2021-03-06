import { hot } from "react-hot-loader";
import { PureComponent } from 'react';
import Section from 'react-bulma-components/lib/components/section';
import ConnectedHeader from '../../container/header';
import ConnectedOmnibox from '../../container/omnibox';
import Panel from 'react-bulma-components/lib/components/panel';
import { Control } from 'react-bulma-components/lib/components/form';
import ConnectedTaskListSelector from '../../container/task-list-selector';
import ConnectedTaskList from '../../container/task-list';
import React from 'react';
import './app.scss';

export class App extends PureComponent {
    constructor(props) {
        super(props);
    }
    // TODO multilanguage
    render() {
        return (
            <Section>
                <ConnectedHeader/>
                <Panel.Block>
                    <Control>
                        <ConnectedOmnibox />
                    </Control>
                </Panel.Block>
                <ConnectedTaskListSelector />
                <ConnectedTaskList />
            </Section>
        );
    }
}

export default hot(module)(App);
