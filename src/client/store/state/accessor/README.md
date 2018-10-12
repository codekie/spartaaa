Mutator
=======

Mutators are not mere setters. They only take a `command` as argument.
The state will be mutated, based on the payload of the `command`.
A mutator is not allowed to directly modify the current state, instead
it must return a copy of the modified state.
