import React, { PureComponent } from 'react';
import './omnibox.scss';
import PropTypes from 'prop-types';
import { Input } from 'react-bulma-components/lib/components/form';

export default class Omnibox extends PureComponent {
    static propTypes = {
        rawValue: PropTypes.string,
        setRawValue: PropTypes.func,
        parse: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.parse();
            return;
        }
    }
    render() {
        const { rawValue, setRawValue } = this.props;
        return (
            <Input size="small" type="text" placeholder="search" value={rawValue}
                onChange={(event) => setRawValue(event.target.value)}
                onKeyPress={(event) => this.handleKeyPress(event)} />
        );
    }
}
