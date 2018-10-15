// # IMPORTS

// 3rd-party
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-bulma-components/lib/components/button';
import Image from 'react-bulma-components/lib/components/image';
import Level from 'react-bulma-components/lib/components/level';
import Panel from 'react-bulma-components/lib/components/panel';
import Section from 'react-bulma-components/lib/components/section';
import Loader from 'react-bulma-components/lib/components/loader';
import { Control, Input } from 'react-bulma-components/lib/components/form';
// App
import CommandType from './store/command-type';
import Action from './store/actions';
import { TaskList } from './component/task-list';
import ConnectionState from './component/connection-state';
import { getTasks } from './store';
import { isLoading } from './store';
// Style
import './app.sass';
import logo from './static/images/sparta.png';

// # CONSTANTS

const MAP__DISPATCH_TO_PROPS = {
    [CommandType.fetchTasks]: Action[CommandType.fetchTasks]
};

// # CLASS DEFINITIONS

class App extends Component {
    static propTypes = {
        fetchTasks: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.fetchTasks();
    }
    // TODO multilanguage
    render() {
        const tasks = getTasks() || [],
            loading = isLoading(),
            { fetchTasks } = this.props;
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
                            <Level.Item>
                                <Button onClick={fetchTasks}>
                                    Refresh
                                </Button>
                            </Level.Item>
                        </Level.Side>
                        <Level.Side align="right">
                            <Level.Item>
                                <Loader className={`${ loading ? 'is-loading' : '' }`} />
                            </Level.Item>
                            <Level.Item>
                                <ConnectionState />
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

// # EXPORT PUBLIC API

export default hot(module)(connect(_mapStateToProps, _mapDispatchToProps)(App));

// # IMPLEMENTATION DETAILS

function _mapStateToProps(state) {
    return { ...state };
}

function _mapDispatchToProps(dispatch) {
    return bindActionCreators({ ...MAP__DISPATCH_TO_PROPS }, dispatch);
}
