import memoize from 'memoize-one';
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

const getFocusableRefs = memoize(
    (parsedValues) => {
        const refs = [];
        parsedValues.project && refs.push(React.createRef());
        (parsedValues.tags || []).forEach(() => refs.push(React.createRef()));
        // Ref, for the search-field
        // Ref-forwarding is not supported yet, with the current version of `react-bulma-components`
        // refs.push(React.createRef());
        return refs;
    }
);

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

    // Constructor and initialization

    constructor(props) {
        super(props);
        this.state = {
            idxFocus: null,
            refsFocusable: null
        };
    }

    // Lifecycle-methods

    componentDidUpdate(prevProps) {
        const { idxFocus, refsFocusable } = this.state;
        if (idxFocus == null) { return; }
        refsFocusable[idxFocus].current.focus();
    }
    static getDerivedStateFromProps(props/*, state*/) {
        return {
            refsFocusable: getFocusableRefs(props.parsedValues)
        };
    }

    // Event-handlers

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
    handleFocus(event, idxRef) {
        this.setState({ idxFocus: idxRef });
    }
    handleBlur() {
        this.setState({ idxFocus: null });
    }

    // Implementation details

    removeTagOnDelete(event, tag) {
        if (event.key !== 'Delete' && event.key !== 'Backspace') { return; }
        this.updateFocusableRefIndex(event);
        this.props.removeTag(tag);
    }
    updateFocusableRefIndex(event) {
        const amountFocusableRefsBeforeRemoval = this.state.refsFocusable.length,
            lastRef = amountFocusableRefsBeforeRemoval === 1;
        if (event.key === 'Backspace') {
            this.setState({
                idxFocus: !lastRef
                    ? Math.max(this.state.idxFocus - 1, 0)
                    : null
            });
        } else if (event.key === 'Delete') {
            this.setState({
                idxFocus: !lastRef
                    ? Math.min(this.state.idxFocus, amountFocusableRefsBeforeRemoval - 2)
                    : null
            });
        }
    }
    clearProjectOnDelete(event) {
        if (event.key !== 'Delete' && event.key !== 'Backspace') { return; }
        this.updateFocusableRefIndex(event);
        this.props.clearProject();
    }
    createProjectItem(project, idxRef, ref) {
        if (!project) { return null; }
        return (
            <div ref={ref} className="sub-cont-project sub-focusable" tabIndex={0}
                onKeyDown={(event) => this.clearProjectOnDelete(event)}
                onFocus={(event) => this.handleFocus(event, idxRef)}
                onBlur={(event) => this.handleBlur(event)}>
                <Tag.Group gapless className="tag-project tag-icon">
                    <Tag color="dark">
                        <Icon className="is-small">
                            <FontAwesomeIcon icon={faFolder} />
                        </Icon>
                    </Tag>
                    <Tag color={COLOR__TAG__PROJECT}>{ project }</Tag>
                </Tag.Group>
            </div>
        );
    }

    // Rendering

    render() {
        const { rawValue, setRawValue, parsedValues } = this.props,
            tags = parsedValues.tags,
            refsFocusable = this.state.refsFocusable;
        let offsetIdxRef = 0;
        return (
            <Panel className="cmp-omnibox">
                {
                    parsedValues.project != null && this.createProjectItem(
                        parsedValues.project, offsetIdxRef, refsFocusable[offsetIdxRef++]
                    )
                }
                {
                    tags.length > 0 && (
                        <Tag.Group className="cmp-sub-tags">{
                            tags.map((tag, idx) => {
                                const idxRef = offsetIdxRef + idx;
                                return (
                                    <div className="sub-cont-tag sub-focusable" tabIndex={0} key={tag}
                                        ref={refsFocusable[idxRef]}
                                        onKeyDown={(event) => this.removeTagOnDelete(event, tag)}
                                        onFocus={(event) => this.handleFocus(event, idxRef)}
                                        onBlur={(event) => this.handleBlur(event)}>
                                        <Tag color={COLOR__TAG}>{ tag }</Tag>
                                    </div>
                                );
                            })
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

