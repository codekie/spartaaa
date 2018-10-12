module.exports = deepFreeze;

function deepFreeze(obj) {
    Object.freeze(obj); // First freeze the object.
    Object.keys(obj).forEach(propKey => {
        let prop = obj[propKey];
        // eslint-disable-next-line angular/typecheck-object
        if (typeof prop !== 'object' || Object.isFrozen(prop)) {
            // If the object is on the prototype, not an object, or is already frozen,
            // skip it. Note that this might leave an unfrozen reference somewhere in the
            // object if there is an already frozen object containing an unfrozen object.
            return;
        }
        deepFreeze(prop); // Recursively call deepFreeze.
    });
    return obj;
}
