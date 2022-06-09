const fs = require("fs/promises");
const fs1 = require('fs');
//const info = require("/home/simon/gumdrop/gumdrop/packages/cli/src/.log/devnet/5avSZHn4vDGjvZge7AmhZNU5DddhyoRMDkPi9DhyMkei/urls.json");
let converted = {};
const info = require("./packages/cli/src/.log/devnet/4mmthxRQunRqbYVoHQ4m1F2TPzok9AeWZgVCWcePgmwq/urls.json");


const main = async () => {
  await fs.rm("proofs/", { recursive: true });
  await fs.mkdir("proofs/", { recursive: true });
  for (let i = 0; i < info.length; i++) {
    const url = new URL(info[i].url);
    const entries = url.searchParams.entries(); //returns an iterator of decoded [key,value] tuples
    const params = paramsToObject(entries);
    if (converted[info[i].handle] == undefined) {
      converted[info[i].handle] = [  params ];
    } else {
      converted[info[i].handle].push(  params );
    }
  }
  console.log(converted)
  fs1.writeFileSync(`proofs/${converted[info[0].handle][0].distributor}.json`, JSON.stringify(converted));
  console.log("done");
};

main().catch((err) => console.error(err));

function paramsToObject(entries) {
  const result = {};
  for (const [key, value] of entries) { // each 'entry' is a [key, value] tupple
    result[key] = value;
    console.log(result[key]);
  }
  return result;
}
