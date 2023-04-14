import ttest from "ttest";
import percentile from "percentile";

const nodeMainResults = {
  total_heap_size: [
    44140, 44140, 44140, 44140, 44396, 44396, 44396, 44396, 44652, 44652,
  ],
  total_available_size: [
    4222257.265625, 4226021.921875, 4226557.2109375, 4227981.8046875,
    4231087.8046875, 4231104.1015625, 4231665.875, 4232312.6484375,
    4232693.90625, 4235516.6953125,
  ],
  used_heap_size: [
    5616.765625, 7422.8125, 10245.4375, 10400.046875, 10631.0859375, 11277.875,
    11851.71875, 14957.5390625, 16913.3828125, 20677.484375,
  ],
};

const nodePcEnabledResults = {
  total_heap_size: [
    4892, 26396, 26652, 26652, 27420, 27676, 27676, 27676, 27676, 27932,
  ],
  total_available_size: [
    4176332.3046875, 4177110.08203125, 4179247.91015625, 4180650.57421875,
    4181242.31640625, 4182071.6015625, 4182407.52734375, 4182761.765625,
    4184694.24609375, 4191152.11328125,
  ],
  used_heap_size: [
    3518.96875, 5735.6640625, 8672.33203125, 9016.375, 10638.046875,
    10958.82421875, 11336.33203125, 12124.14453125, 14151.80859375,
    17037.62890625,
  ],
};

function compareResults() {
  Object.keys(nodeMainResults).forEach((key) => {
    const mainValue = nodeMainResults[key];
    const pcValue = nodePcEnabledResults[key];
    const res = ttest(mainValue, pcValue, { varEqual: true, alpha: 0.05 });
    if (res.pValue() <= 0.05) {
      console.log("----------------------");
      console.group(key);
      console.group(`50th percentile`);
      console.log(`main`, percentile(50, mainValue));
      console.log(`pc enabled`, percentile(50, pcValue));
      console.groupEnd();

      console.group(`75th percentile`);
      console.log(`main`, percentile(75, mainValue));
      console.log(`pc enabled`, percentile(75, pcValue));
      console.groupEnd();

      console.group(`95th percentile`);
      console.log(`main`, percentile(95, mainValue));
      console.log(`pc enabled`, percentile(95, pcValue));
      console.groupEnd();
      console.groupEnd();
    }
  });
}

compareResults();
