// See: https://redux.js.org/recipes/usingimmutablejs#use-a-higher-order-component-to-convert-your-smart-components-immutable-js-props-to-your-dumb-components-javascript-props

import React from 'react';
import { Iterable } from 'immutable';

export default extractImmutable;

function extractImmutable(WrappedComponent) {
    return function(wrappedComponentProps) {
        const extractedProps = Object.entries(wrappedComponentProps)
            .reduce((extractedProps, entryWrappedProps) => {
                const key = entryWrappedProps[0],
                    val = entryWrappedProps[1];
                extractedProps[key] = Iterable.isIterable(val)
                    ? val.toJS()
                    : val;
                return extractedProps;
            }, {});
        return <WrappedComponent {...extractedProps} />;
    };
}
