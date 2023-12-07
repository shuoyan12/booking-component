function getNumberIntervals(inputIntervals) {
  inputIntervals.sort((a, b) => a[0] - b[0]);

  let result = {
    overlap: [],
    notInclude: [],
  };

  let currentStart = 0;
  let currentEnd = 0;

  for (const [start, end] of inputIntervals) {
    if (start <= currentEnd) {
      if (end > currentEnd) {
        result.overlap.push([Math.max(currentStart, start), end]);
        currentEnd = end;
      }
    } else {
      result.notInclude.push([currentEnd + 1, start - 1]);
      currentStart = start;
      currentEnd = end;
    }
  }

  if (currentEnd < 20) {
    result.notInclude.push([currentEnd + 1, 20]);
  }

  return result;
}

export default getNumberIntervals;
