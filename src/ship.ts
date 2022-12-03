export let Ship = (length: number) => {
  let hits = 0;
  let sunk = false;
  return {
    length: length,
    hits: hits,
    sunk,
    hit: function() {
      this.hits += 1;
    },
  };
};

console.log(Ship(2));
