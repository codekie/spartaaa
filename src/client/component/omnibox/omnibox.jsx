import React, { PureComponent } from 'react';
import './omnibox.scss';
import PropTypes from 'prop-types';
import Panel from 'react-bulma-components/lib/components/panel';
import { Input } from 'react-bulma-components/lib/components/form';
import Tag from 'react-bulma-components/lib/components/tag';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

const COLOR__TAG__PROJECT = 'info',
    COLOR__TAG = 'primary';

export default class Omnibox extends PureComponent {
    static propTypes = {
        applyFilter: PropTypes.func,
        parse: PropTypes.func,
        parsedValues: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
            priority: PropTypes.string,
            project: PropTypes.string,
            status: PropTypes.string,
            searchTerm: PropTypes.string
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
        const { rawValue, setRawValue, parsedValues } = this.props,
            tags = parsedValues.tags;
        return (
            <Panel className="cmp-omnibox">
                { _createProjectItem(parsedValues.project) }
                {
                    tags.length > 0 && (
                        <Tag.Group className="cmp-sub-tags">{
                            tags.map((tag) => (
                                <Tag key={tag} color={COLOR__TAG} tabIndex={0}>{ tag }</Tag>
                            ))
                        }</Tag.Group>
                    )
                }
                <Input size="small" type="text" className="cmp-sub-input" placeholder="search" value={rawValue}
                    onChange={(event) => setRawValue(event.target.value)}
                    onKeyDown={(event) => this.handleKeyDown(event)} />
            </Panel>
        );
    }
}

function _createProjectItem(project) {
    if (!project) { return null; }
    return (
        <Tag.Group gapless className="tag-project tag-icon" tabIndex={0}>
            <Tag color="dark">
                <Icon className="is-small">
                    <FontAwesomeIcon icon={faFolder} />
                </Icon>
            </Tag>
            <Tag color={COLOR__TAG__PROJECT}>{ project }</Tag>
        </Tag.Group>
    );
}

