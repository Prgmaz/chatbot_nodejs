const fs = require("fs");
const { NlpManager } = require("node-nlp");

const manager = new NlpManager({
	languages: ["en"],
});
const files = fs.readdirSync("./intents");

for (const file of files) {
	let data = fs.readFileSync(`./intents/${file}`);
	data = JSON.parse(data);

	const intent = file.replace(".json", "");

	for (const question of data.questions) {
		manager.addDocument("en", question, intent);
	}

	for (const answer of data.answers) {
		manager.addAnswer("en", intent, answer);
	}
}

(async () => {
	await manager.train();
	manager.save();
})();
