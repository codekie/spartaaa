import React, { PureComponent } from 'react';
import './omnibox.scss';
import PropTypes from 'prop-types';
import { Input } from 'react-bulma-components/lib/components/form';

export default class Omnibox extends PureComponent {
    static propTypes = {
        applyFilter: PropTypes.func,
        parse: PropTypes.func,
        parsedValues: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
            priority: PropTypes.string,
            project: PropTypes.string,
            status: PropTypes.string
        }),
        rawValue: PropTypes.string,
        setRawValue: PropTypes.func
    };

    constructor(props) {
        super(props);
    }
    handleKeyDown(event) {
        switch (event.key) {
            case 'Enter':
            case ' ':
            case 'Tab':
                this.props.parse();
                break;
        }
        if (event.key === 'Enter') {
            this.props.applyFilter();
        }
    }
    render() {
        const { rawValue, setRawValue } = this.props;
        return (
            <Input size="small" type="text" className="cmp-sub-input" placeholder="search" value={rawValue}
                onChange={(event) => setRawValue(event.target.value)}
                onKeyDown={(event) => this.handleKeyDown(event)} />
        );
    }
}
