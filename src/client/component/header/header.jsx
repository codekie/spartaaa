// # IMPORTS

// 3rd-party
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bulma-components/lib/components/button';
import Image from 'react-bulma-components/lib/components/image';
import Level from 'react-bulma-components/lib/components/level';
import Panel from 'react-bulma-components/lib/components/panel';
import Loader from 'react-bulma-components/lib/components/loader';
// App
import ConnectionState from '../../component/connection-state';
// Style
import LOGO from '../../static/images/sparta.png';

// # CLASS DEFINITIONS

export default class Header extends PureComponent {
    static propTypes = {
        refreshTasks: PropTypes.func.isRequired,

        connectionState: PropTypes.string,
        loading: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { connectionState, refreshTasks, loading } = this.props;
        return (
            <Panel.Header>
                <Level renderAs="nav">
                    <Level.Side align="left">
                        <Level.Item>
                            <Image size={32} alt="32x32" src={LOGO} />
                        </Level.Item>
                        <Level.Item>
                            This is Spartaaa!!!
                        </Level.Item>
                        <Level.Item>
                            <Button onClick={refreshTasks}>
                                Refresh
                            </Button>
                        </Level.Item>
                    </Level.Side>
                    <Level.Side align="right">
                        <Level.Item>
                            <Loader className={`${ loading ? 'is-loading' : '' }`} />
                        </Level.Item>
                        <Level.Item>
                            <ConnectionState connectionState={connectionState} />
                        </Level.Item>
                    </Level.Side>
                </Level>
            </Panel.Header>
        );
    }
}
