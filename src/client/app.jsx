import React from 'react';
import ReactDOM from 'react-dom';
import logo from './static/images/sparta.png';

const Index = () => {
    return (<div>
        This is Spartaaa!!!
        <img src={logo} />
    </div>);
};

ReactDOM.render(<Index />, document.getElementById('index'));
