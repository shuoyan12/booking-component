function getNumberIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let overlap = generateOverlap(intervals);
  let notInclude = generateNotInclude(intervals);

  return { overlap, notInclude };
}

function generateOverlap(intervals) {
  let overlapIntervals = [];

  for (let i = 0; i < intervals.length - 1; i++) {
    let [start, end] = intervals[i];
    let nextInterval = intervals[i + 1];

    // Check for overlap
    if (end >= nextInterval[0]) {
      let overlapStart = Math.max(start, nextInterval[0]);
      let overlapEnd = Math.min(end, nextInterval[1]);
      overlapIntervals.push([overlapStart, overlapEnd]);
    }
  }

  return overlapIntervals;
}

function generateNotInclude(intervals) {
  const allNumbers = new Set();

  intervals.forEach(([start, end]) => {
    for (let i = start; i <= end; i++) {
      allNumbers.add(i);
    }
  });

  const possibleNumbers = generateArray(0, 20);
  const missingNumbers = possibleNumbers.filter((num) => !allNumbers.has(num));

  const notInclude = [];
  let currentInterval = null;

  for (const num of missingNumbers) {
    if (currentInterval === null) {
      currentInterval = [num, num];
    } else if (num === currentInterval[1] + 1) {
      currentInterval[1] = num;
    } else {
      notInclude.push([...currentInterval]);
      currentInterval = [num, num];
    }
  }

  if (currentInterval !== null) {
    notInclude.push([...currentInterval]);
  }

  return notInclude;
}

function generateArray(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
export { generateArray };
export default getNumberIntervals;
