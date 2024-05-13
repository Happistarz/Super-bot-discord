	const collection = listModels(BanUser, "username = 'happiz'")
		.then(console.log)
		.catch(console.error);
