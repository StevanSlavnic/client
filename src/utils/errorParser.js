let messages = {};

/**
 * Entry point method for parsing errors
 *
 * @param error
 * @returns {{}}
 */
export const errorParser = (error) => {
    messages = {};
    parseErrors(error);

    return messages;
};

/**
 * Recursive function that export errors in one level depth
 * @param element
 * @param name
 * @returns {boolean}
 */
const parseErrors = (element, name='form') => {
    let elementError = name + "Error";

    if (element.hasOwnProperty('errors') && element.errors.length > 0) {
        messages[elementError] = element.errors;
    } else if (element.hasOwnProperty('children')) {
        for (let children of Object.keys(element.children)) {
            let errorName = name
                ? name + children[0].toUpperCase() + children.substring(1)
                : children;
            parseErrors(element.children[children], errorName);
        }
    } else if (element.hasOwnProperty('message') && this.hasOwnProperty(elementError)) {
        messages[elementError] = element.errors;
    }

    return true;
};