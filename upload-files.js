const { WebClient, LogLevel } = require("@slack/web-api");
const { createReadStream } = require("fs");
const { default: joinImages } = require("join-images");
// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
  // LogLevel can be imported and used to make debugging simpler
  logLevel: LogLevel.DEBUG,
});

// The name of the file you're going to upload
const folder = "./test-results/";
// ID of channel that #stock
const channelId = "C032JKDP3TJ";

const uploadFile = async () => {
  try {
    const files = getfiles(folder);
    const images = files.map((fileName) => folder + fileName);
    await joinImages(images, { direction: "horizontal" }).then((img) =>
      img.toFile("./combined.png")
    );
    await client.files.upload({
      // channels can be a list of one to many strings
      channels: channelId,
      initial_comment: `:smile:`,
      // Include your filename in a ReadStream here
      file: createReadStream("./combined.png"),
    });
  } catch (error) {
    console.error(error);
  }
};

const getfiles = (folder) => {
  // get files list in  test-results folder
  const fs = require("fs");
  const files = fs.readdirSync(folder);
  console.log(files);
  return files;
};

(async () => {
  uploadFile();
})();
