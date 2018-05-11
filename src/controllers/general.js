const generatevidId = () => (Date.now().toString(36).substr(3, 9) + Math.random().toString(36).substr(3, 5));

module.exports = { generatevidId }
