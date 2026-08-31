
// dummy.js
//
// Run with:
//   node --cpu-prof dummy.js
//
// This should produce a CPU profile file in the current directory.

function coldFunction() {
  // Deliberately tiny amount of work.
  return "cold";
}

function innerHotFunction(iterations) {
  let result = 0;

  for (let i = 0; i < iterations; i++) {
    result += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
  }

  return result;
}

function middleHotFunction(iterations) {
  let localWork = 0;

  for (let i = 0; i < 100_000; i++) {
    localWork += Math.sqrt(i);
  }

  return localWork + innerHotFunction(iterations);
}

function outerHotFunction() {
  return middleHotFunction(50_000_000);
}

function main() {
  console.log("Starting CPU workload...");

  // Cold baseline: called only once.
  coldFunction();

  // Hot path: creates the obvious CPU hotspot.
  const result = outerHotFunction();

  console.log("CPU workload complete.");
  console.log("Result:", result);
}

main();