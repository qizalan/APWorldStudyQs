const { readFileSync, writeFileSync } = require('fs');
const { globSync } = require('glob');

const data = {
	// "Period #: Name": {
	// 	"Unit #: Name": {
	// 		"Topic #: Name": [
	// 			[ "Q", "A" ]
	// 		]
	// 	}
	// }
};

const files = globSync('Period*/**/*.txt').reverse();

files.forEach(f => {
	const [ period, unit, topicTXT ] = f.split('/');
	if (!data[period]) data[period] = {};
	if (!data[period][unit]) data[period][unit] = {};
	const topic = topicTXT.slice(0, topicTXT.length - '.txt'.length);
	const file = readFileSync(f, 'utf-8');

	const questions = [];
	const groups = file.split('> ');
	groups.forEach(group => {
		if (!group.length) return;
		const split = group.split('\n');
		const lines = group.endsWith('\n\n') ? split.slice(0, split.length - 2) : split;
		const question = lines.shift();
		const answer = lines.join('\n');
		questions.push([ question, answer ]);
	});

	data[period][unit][topic] = questions;
});

writeFileSync('./questions.json', JSON.stringify(data), 'utf-8');