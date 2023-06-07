// const jsonfile = require("jsonfile");
import jsonfile from 'jsonfile';
// const moment = require("moment");
import moment from 'moment';
// const simpleGit = require("simple-git");
import simpleGit from 'simple-git';
// const random = require("random");
import random from 'random';

const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) {
    return simpleGit().push().then(() => console.log("Pushed to remote"));
  }

  const x = random.int(0, 26);
  const y = random.int(0, 6);

  const DATE = moment()
    .subtract(7, "m")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: DATE,
  };

  console.log(DATE);

  return jsonfile.writeFile(FILE_PATH, data)
    .then(() => simpleGit()
      .add([FILE_PATH])
      .commit(DATE, { "--date": DATE })
      .then(() => makeCommit.bind(this, --n))
    );
};

makeCommit(300).then(() => console.log("Done"));
