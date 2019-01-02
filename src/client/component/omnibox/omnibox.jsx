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
        removeTag: PropTypes.func,
        clearProject: PropTypes.func,
        parsedValues: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
            priority: PropTypes.string,
            project: PropTypes.string,
            status: PropTypes.string,
            searchTerm: PropTypes.string
        }).isRequired,
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
    removeTagOnDelete(event, tag) {
        if (event.key !== 'Delete' && event.key !== 'Backspace') { return; }
        this.props.removeTag(tag);
    }
    clearProjectOnDelete(event) {
        if (event.key !== 'Delete' && event.key !== 'Backspace') { return; }
        this.props.clearProject();
    }
    createProjectItem(project) {
        if (!project) { return null; }
        return (
            <Tag.Group gapless className="tag-project tag-icon sub-focusable" tabIndex={0}
                onKeyDown={(event) => this.clearProjectOnDelete(event)}>
                <Tag color="dark">
                    <Icon className="is-small">
                        <FontAwesomeIcon icon={faFolder} />
                    </Icon>
                </Tag>
                <Tag color={COLOR__TAG__PROJECT}>{ project }</Tag>
            </Tag.Group>
        );
    }
    render() {
        const { rawValue, setRawValue, parsedValues } = this.props,
            tags = parsedValues.tags;
        return (
            <Panel className="cmp-omnibox">
                { this.createProjectItem(parsedValues.project) }
                {
                    tags.length > 0 && (
                        <Tag.Group className="cmp-sub-tags">{
                            tags.map((tag) => (
                                <Tag key={tag} color={COLOR__TAG} className="sub-focusable" tabIndex={0}
                                    onKeyDown={(event) => this.removeTagOnDelete(event, tag)}>{ tag }</Tag>
                            ))
                        }</Tag.Group>
                    )
                }
                <Input size="small" type="text" className="cmp-sub-input sub-focusable" placeholder="search"
                    value={rawValue} onChange={(event) => setRawValue(event.target.value)}
                    onKeyDown={(event) => this.handleKeyDown(event)} />
            </Panel>
        );
    }
}

