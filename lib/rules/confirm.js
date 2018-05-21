'use strict';

/**
 * "Confirm" rule -- used to check if one field exactly
 * matches the value of another field
 * @param {string} referenceField
 * @param {Function} error
 * @param {boolean} [checkPresence = true] Throw an error if "referenceField" is not defined in the full payload
 * @returns {Function}
 */
module.exports = ({

    referenceField,
    error = field => `Must be the same as "${field}"`,
    checkPresence = true,

}) => (value, otherValues) => {

    if (!referenceField) return '"referenceField" undefined';
    if (checkPresence && !(referenceField in otherValues)) return `"${referenceField}" not defined in form fields`;
    const reference = otherValues[referenceField];
    if (value !== reference) return error(referenceField);

    return null;

};