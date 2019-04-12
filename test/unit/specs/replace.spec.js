var expect = require('chai').expect;
function add(a, b) {
    return a + b;
}

function reduce(a, b) {
    return a - b;
}

describe('add', () => {
    it('1+2=3', function () {
        expect(add(1, 2)).to.equal(3);
    });
});

describe('reduce', () => {
    it('1+2=3', function () {
        expect(reduce(2, 1)).to.equal(1);
    });
});
