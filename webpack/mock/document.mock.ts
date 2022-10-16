let doc;

if (typeof window !== 'undefined' && typeof window.getComputedStyle === 'function') {
    doc = window.document;
} else {
    doc = {
        body: {},
        getElementById() {},
    };
}

export default doc;
