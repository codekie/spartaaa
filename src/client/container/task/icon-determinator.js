import { faBug, faTasks } from '@fortawesome/free-solid-svg-icons';

const ICON__DEFAULT = faTasks,
    ICON__BUG = faBug,
    TAG__BUG = 'bug';

export default function determineIcon(task) {
    const tags = task.tags || [];
    if (tags.includes(TAG__BUG)) {
        return ICON__BUG;
    }
    return ICON__DEFAULT;
}
