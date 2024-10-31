const { fetchBiliSubtitle } = require("./bilibili");

// fetchBiliSubtitle("BV1F3yQYYE8r");

async function serialLoopRequests(arr) {
  for (const item of arr) {
    console.log(item);

    await fetchBiliSubtitle(item);
  }
  return result;
}

serialLoopRequests([
  "BV1cySvYeE2H",
  "BV1j7ySYDESN",
  "BV1nqC2Y7ELe",
  "BV1fvm5YwEeD",
  "BV1F9sZeJEYx",
  "BV1Ejxue5E8H",
  "BV1N9bwe2E1p",
  "BV1BZ44eAEBu",
  "BV1rAHUeQEyj",
  "BV1FT421z7M2",
  "BV1g142187mF",
  "BV1Mf421B735",
  "BV1uz421B7at",
  "BV1Rf421q7mB",
  "BV1sZ421T7a6",
  "BV1dz421q7xS",
  "BV1k1421b7oe",
  "BV1Ss421T7Dm",
  "BV1ss421M7mu",
  "BV1Zm421V7Mp",
  "BV1mJ4m1g7ce",
  "BV1Gn4y197Ex",
  "BV1Rf42197ei",
  "BV1Tm421T7Us",
  "BV14H4y1u7HX",
  "BV1jD421A7Rm",
  "BV1KM4m1y7pE",
  "BV1mm421p7g9",
  "BV1ft421j75E",
  "BV15Z421e7Xn",
]);
