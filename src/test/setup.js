import * as Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

init();

function init() {
    setupEnzyme();
}

function setupEnzyme() {
    Enzyme.configure({ adapter: new Adapter() });
}
