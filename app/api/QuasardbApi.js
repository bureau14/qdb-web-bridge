import {HTTP,URL} from './../helpers/RestHelper.js';

function transformLinks(response) {
	if (response && response.links) {
		response.funcs = {};
		for (const key in response.links) {
			const url = response.links[key];
			response.funcs[key] = () => HTTP.get(url).then(deserializeJson).then(transformLinks);
		}
	}
	return response;
}

function deserializeJson({responseText}) {
	return JSON.parse(responseText);
}

function falseIfUnchanged({status}) {
	return status != 304;
}

class QuasardbApi {
	addTag(alias, tag) {
		const url = URL `api/v1/entries/${alias}?action=addTag&tag=${tag}`;

		return HTTP.patch(url)
			.then(falseIfUnchanged);
	}

	blobPut(alias, content, progress) {
		const url = URL `api/v1/blobs/${alias}`;

		return HTTP.post(url, content, progress);
	}

	blobGet(alias) {
		const url = URL `api/v1/blobs/${alias}/content`;

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	blobScan(pattern) {
		const url = URL `api/v1/blobs?pattern=${pattern}`;

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	prefixSearch(prefix, limit=100) {
		const url = URL `api/v1/entries?${{prefix, limit}}`

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	getEntry(alias) {
		const url = URL `api/v1/entries/${alias}`;

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	getTagged(tag) {
		const url = URL `api/v1/tags/${tag}/entries`;

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	getTags(alias) {
		const url = URL `api/v1/entries/${alias}/tags`

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	entry(alias) {
		const url = URL `api/v1/entries/${alias}`;

		return HTTP.get(url)
			.then(deserializeJson)
			.then(transformLinks);
	}

	removeTag(alias, tag) {
		const url = URL `api/v1/entries/${alias}?action=removeTag&tag=${tag}`;

		return HTTP.patch(url)
			.then(falseIfUnchanged);
	}

	remove(alias) {
		const url = URL `api/v1/entries/${alias}`;

		return HTTP.delete(url);
	}

	search(mode, text) {
		switch (mode) {
		case "prefix":
			return this.prefixSearch(text);
		case "tag":
			return this.getTagged(text);
		case "content":
			return this.blobScan(text);
		default:
			return Promise.reject('Invalid mode: ' + mode);
		}
	}
}

export default new QuasardbApi();
