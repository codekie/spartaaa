import { faQuestion, faPlug, faBolt, faBroadcastTower } from '@fortawesome/free-solid-svg-icons';
import { STATE } from '../../store/reducer/connection';

const DEFAULT__CONNECTION_STATE = {
    title: 'Unknown',
    icon: faQuestion
};

const MAP__CONNECTION_STATE = {
    [STATE.connected]: {
        title: 'Connected',
        name: 'connected',
        icon: faBroadcastTower
    },
    [STATE.connecting]: {
        title: 'Connecting',
        name: 'connecting',
        icon: faPlug
    },
    [STATE.disconnected]: {
        title: 'Disconnected',
        name: 'disconnected',
        icon: faBolt
    }
};

export default function determineIcon(connectionState) {
    const icon = MAP__CONNECTION_STATE[connectionState];
    return icon || DEFAULT__CONNECTION_STATE;
}
