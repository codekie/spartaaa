import memoize from 'memoize-one';
import React, { PureComponent } from 'react';
import './omnibox.scss';
import PropTypes from 'prop-types';
import Panel from 'react-bulma-components/lib/components/panel';
import { Input } from 'react-bulma-components/lib/components/form';
import Tag from 'react-bulma-components/lib/components/tag';
import Icon from 'react-bulma-components/lib/components/icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faFolder } from '@fortawesome/free-solid-svg-icons';

const COLOR__TAG__PROJECT = 'info',
    COLOR__TAG = 'primary';

const getFocusableRefs = memoize(
    (parsedValues) => {
        const refsFocusable = [];
        parsedValues.priority && refsFocusable.push(React.createRef());
        parsedValues.project && refsFocusable.push(React.createRef());
        (parsedValues.tags || []).forEach(() => refsFocusable.push(React.createRef()));
        // Input-field
        refsFocusable.push(React.createRef());
        const idxRefFocusableInput = refsFocusable.length - 1;
        return {
            refsFocusable,
            idxRefFocusableInput
        };
    }
);

export default class Omnibox extends PureComponent {
    static propTypes = {
        applyFilter: PropTypes.func,
        parse: PropTypes.func,
        removeTag: PropTypes.func,
        clearPriority: PropTypes.func,
        clearProject: PropTypes.func,
        parsedValues: PropTypes.shape({
            tags: PropTypes.arrayOf(PropTypes.string),
            priority: PropTypes.string,
            project: PropTypes.string,
            status: PropTypes.string,
            searchTerm: PropTypes.string
        }).isRequired,
        rawValue: PropTypes.string,
        setRawValue: PropTypes.func,
        serializedValue: PropTypes.string.isRequired
    };

    // Constructor and initialization

    constructor(props) {
        super(props);
        this.state = {
            idxFocus: null,
            idxRefFocusableInput: null,
            refsFocusable: null,
            inputText: '',
            prevSerializedValue: '',
            prevAppliedSerializedValue: ''
        };
    }

    // Lifecycle-methods

    componentDidUpdate(prevProps) {
        const { idxFocus, refsFocusable } = this.state;
        if (idxFocus == null) { return; }
        refsFocusable[idxFocus].current.focus();
    }
    static getDerivedStateFromProps(props, state) {
        const { serializedValue, parsedValues } = props,
            { refsFocusable, idxRefFocusableInput } = getFocusableRefs(props.parsedValues);
        return {
            inputText: state.prevSerializedValue !== serializedValue
                ? parsedValues.searchTerm
                : state.inputText,
            prevSerializedValue: serializedValue,
            refsFocusable,
            idxRefFocusableInput,
            // If the input-field had the focus before, update `idxFocus` with the new `idxFocus` of the input-field,
            // after the criteria have been parsed and the index of the input (maybe) has changed
            idxFocus: state.idxFocus === state.idxRefFocusableInput
                ? idxRefFocusableInput
                : state.idxFocus
        };
    }

    // Event-handlers

    handleInputKeyDown(event) {
        const { key, target } = event,
            { refsFocusable, idxRefFocusableInput } = this.state,
            inputValue = refsFocusable[idxRefFocusableInput].current.value;
        //noinspection FallThroughInSwitchStatementJS
        switch (key) {
            case 'Enter':
            case ' ':
            case 'Tab':
                this.props.setRawValue(this.state.inputText);
                this.props.parse();
                break;

            // Keys for navigating within the omnibox
            case 'ArrowLeft':
            case 'Backspace':
                if (target.selectionStart !== target.selectionEnd
                    || target.selectionStart > 0 && inputValue.length > 0
                ) {
                    return;
                }
            case 'ArrowRight':
                if (key === 'ArrowRight' && (
                    target.selectionStart !== target.selectionEnd
                    || target.selectionEnd === inputValue.length - 1 && inputValue.length > 0
                )) {
                    return;
                }
                break;
            default:
                this.setState({ inputText: event.target.value });
        }
        this.updateFocusableRefIndex(event);
        if (event.key === 'Enter') {
            this.filter();
        }
    }
    handleFocus(event, idxRef) {
        this.setFocusIndex(idxRef);
    }
    handleBlur() {
        this.setFocusIndex(null);
    }
    handleInputBlur() {
        this.parseAndFilter();
        this.handleBlur();
    }
    handleTagKeyDown(event, tag) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.updateFocusableRefIndex(event);
                break;
            case 'Delete':
            case 'Backspace':
                this.removeCriterion(event, this.props.removeTag, tag);
                break;
        }
    }
    handlePriorityKeyDown(event) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.updateFocusableRefIndex(event);
                break;
            case 'Delete':
            case 'Backspace':
                this.removeCriterion(event, this.props.clearPriority);
                break;
        }
    }
    handleProjectKeyDown(event) {
        switch (event.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
                this.updateFocusableRefIndex(event);
                break;
            case 'Delete':
            case 'Backspace':
                this.removeCriterion(event, this.props.clearProject);
                break;
        }
    }

    // Implementation details

    setFocusIndex(idxFocus) {
        this.setState({ idxFocus });
    }
    filter() {
        // Only apply filter, if criteria have changed
        if (this.state.prevAppliedSerializedValue === this.props.serializedValue) {
            return;
        }
        this.props.applyFilter();
        this.setState({ prevAppliedSerializedValue: this.props.serializedValue });
    }
    parseAndFilter() {
        this.props.setRawValue(this.state.inputText);
        this.props.parse();
        window.setTimeout(() => this.filter());
    }
    removeCriterion(event, removeHandler, value = null) {
        this.updateFocusableRefIndex(event);
        removeHandler(value);
        window.setTimeout(() => this.setState({ prevAppliedSerializedValue: this.props.serializedValue }));
    }
    updateFocusableRefIndex(event) {
        const amountFocusableRefsBeforeRemoval = this.state.refsFocusable.length,
            lastRef = amountFocusableRefsBeforeRemoval === 1;
        // Don't reset the focus-index, if the input-field has the focus
        if (this.state.idxFocus !== this.state.idxRefFocusableInput && lastRef) {
            this.setFocusIndex(null);
            return;
        }
        let idxFocus = this.state.idxFocus;
        switch (event.key) {
            case 'ArrowLeft':
                idxFocus = Math.max(this.state.idxFocus - 1, 0);
                break;
            case 'Delete':
                idxFocus = Math.min(this.state.idxFocus, amountFocusableRefsBeforeRemoval - 2);
                break;
            case 'ArrowRight':
                idxFocus = Math.min(this.state.idxFocus + 1, amountFocusableRefsBeforeRemoval - 1);
                break;
            case 'Backspace':
                idxFocus = Math.max(this.state.idxFocus - 1, 0);
                break;
        }
        this.setFocusIndex(idxFocus);
    }

    // Renderer-helper

    createPriorityItem(priority, idxRef, ref) {
        if (!priority) { return null; }
        const { clearPriority } = this.props;
        return (
            <div ref={ref} className="sub-cont-taggroup sub-focusable" tabIndex={0}
                onKeyDown={(event) => this.handlePriorityKeyDown(event)}
                onFocus={(event) => this.handleFocus(event, idxRef)}
                onBlur={(event) => this.handleBlur(event)}>
                <Tag.Group gapless className="tag-priority tag-icon">
                    <Tag color="dark">
                        <Icon className="is-small">
                            <FontAwesomeIcon icon={faExclamationCircle} />
                        </Icon>
                    </Tag>
                    <Tag color={COLOR__TAG__PROJECT}>{ priority }</Tag>
                    <Tag remove onClick={(event) => this.removeCriterion(event, clearPriority)} />
                </Tag.Group>
            </div>
        );
    }
    createProjectItem(project, idxRef, ref) {
        if (!project) { return null; }
        const { clearProject } = this.props;
        return (
            <div ref={ref} className="sub-cont-taggroup sub-focusable" tabIndex={0}
                onKeyDown={(event) => this.handleProjectKeyDown(event)}
                onFocus={(event) => this.handleFocus(event, idxRef)}
                onBlur={(event) => this.handleBlur(event)}>
                <Tag.Group gapless className="tag-project tag-icon">
                    <Tag color="dark">
                        <Icon className="is-small">
                            <FontAwesomeIcon icon={faFolder} />
                        </Icon>
                    </Tag>
                    <Tag color={COLOR__TAG__PROJECT}>{ project }</Tag>
                    <Tag remove onClick={(event) => this.removeCriterion(event, clearProject)} />
                </Tag.Group>
            </div>
        );
    }

    // Rendering

    render() {
        const { parsedValues, removeTag } = this.props,
            tags = parsedValues.tags,
            { refsFocusable, idxRefFocusableInput } = this.state;
        let offsetIdxRef = 0;
        return (
            <Panel className="cmp-omnibox">
                {
                    parsedValues.priority != null && this.createPriorityItem(
                        parsedValues.priority, offsetIdxRef, refsFocusable[offsetIdxRef++]
                    )
                }
                {
                    parsedValues.project != null && this.createProjectItem(
                        parsedValues.project, offsetIdxRef, refsFocusable[offsetIdxRef++]
                    )
                }
                <div className="sub-cont-taggroup">{
                    tags.length > 0 && (
                        <Tag.Group gapless className="cmp-sub-tags">{
                            tags.map((tag, idx) => {
                                const idxRef = offsetIdxRef + idx;
                                return (
                                    <div className="sub-cont-tag sub-focusable" tabIndex={0} key={tag}
                                        ref={refsFocusable[idxRef]}
                                        onKeyDown={(event) => this.handleTagKeyDown(event, tag)}
                                        onFocus={(event) => this.handleFocus(event, idxRef)}
                                        onBlur={(event) => this.handleBlur(event)}>
                                        <Tag.Group gapless className="cmp-sub-tags">
                                            <Tag color={COLOR__TAG}>{tag}</Tag>
                                            <Tag remove
                                                onClick={(event) => this.removeCriterion(event, removeTag, tag)} />
                                        </Tag.Group>
                                    </div>
                                );
                            })
                        }</Tag.Group>
                    )
                }</div>
                <Input ref={refsFocusable[idxRefFocusableInput]} size="small" type="text"
                    className="cmp-sub-input sub-focusable" placeholder="search" value={this.state.inputText}
                    onChange={(event) => this.setState({ inputText: event.target.value })}
                    onKeyDown={(event) => this.handleInputKeyDown(event)}
                    onFocus={(event) => this.handleFocus(event, idxRefFocusableInput)}
                    onBlur={() => this.handleInputBlur()} />
            </Panel>
        );
    }
}

