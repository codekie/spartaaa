export {
    applyMutation
};

function applyMutation(command, mutators) {
    return mutators.map(mutate => mutate(command));
}
