// permutations.js
function permutations(arr) {
    if (arr.length === 1) {
      return [arr];
    }
  
    const results = [];
    for (let i = 0; i < arr.length; i++) {
      const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
      const restPermutations = permutations(rest);
      for (const perm of restPermutations) {
        results.push([arr[i], ...perm]);
      }
    }
  
    return results;
  }
  
  module.exports = { permutations };
  