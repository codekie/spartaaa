import React, { Component } from 'react';

export default class Task extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { task } = this.props;
        return (<a className="panel-block">{ task.description }</a>);
    }
}
