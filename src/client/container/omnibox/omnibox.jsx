// # IMPORTS

// 3rd-party
import { connect } from 'react-redux';
// App
import Omnibox from '../../component/omnibox';
import ActionType from '../../store/action-type';
import ActionCreator from '../../store/action-creators';
import { extractImmutable } from '../../util';
import { createStateMapper, createDispatchMapper } from '../../util/prop-mapper';

// # CONSTANTS

const MAP__STATE_TO_PROPS = {
        parsedValues: (state) => state.get('omnibox').get('parsed').toJS(),
        rawValue: (state) => state.get('omnibox').get('rawValue')
    },
    MAP__DISPATCH_TO_PROPS = {
        applyFilter: ActionCreator[ActionType.applyOmniboxFilter],
        setRawValue: ActionCreator[ActionType.setOmniboxRawValue],
        parse: ActionCreator[ActionType.parseOmniboxRawValue]
    };

// # EXPORT PUBLIC API

export default connect(
    createStateMapper(MAP__STATE_TO_PROPS, Omnibox),
    createDispatchMapper(MAP__DISPATCH_TO_PROPS)
)(extractImmutable(Omnibox));
