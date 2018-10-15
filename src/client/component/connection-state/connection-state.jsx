import React, { Component } from 'react';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getConnectionState } from '../../store/state/accessor/connection';
import determineIcon from './icon-determinator';
import './connection-state.sass';

export default class ConnectionState extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { title, icon, name } = determineIcon(getConnectionState());
        return (
            <Icon title={title} className={`cmp-connection-state is-medium state-${name}`}>
                <FontAwesomeIcon icon={icon} />
            </Icon>
        );
    }
}
