import React from 'react';

/**
 * Get root contexts list
 * @param contexts
 */
const getRootContexts = (contexts?: React.FC[]): React.FC[] =>
    contexts.reduce((acc: React.FC[], context) => {
        acc.push(context);
        return acc;
    }, []);

export default getRootContexts;
