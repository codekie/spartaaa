export {
    applyMutation
};

function applyMutation(action, mutators) {
    return mutators.map(mutate => mutate(action));
}
