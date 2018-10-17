Mutator
=======

Mutators are not mere setters. They only take an `action` as argument.
The state will be mutated, based on the payload of the `action`.
A mutator is not allowed to directly modify the current state, instead
it must return a copy of the modified state.
