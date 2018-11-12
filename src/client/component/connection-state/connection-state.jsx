import React, { PureComponent } from 'react';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import determineIcon from './icon-determinator';
import './connection-state.scss';
import PropTypes from 'prop-types';

export default class ConnectionState extends PureComponent {
    static propTypes = {
        connectionState: PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { connectionState } = this.props,
            { title, icon, name } = determineIcon(connectionState);
        return (
            <Icon title={title} className={`cmp-connection-state is-medium state-${name}`}>
                <FontAwesomeIcon icon={icon} />
            </Icon>
        );
    }
}
