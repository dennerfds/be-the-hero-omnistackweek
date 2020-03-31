const generateUniqueID = require('../../src/utils/generateUniqueID');

describe('Generate Unique ID', () => {
    it('Should generate an Unique ID', () => {
        expect(generateUniqueID())
            .toHaveLength(8);
    });
});