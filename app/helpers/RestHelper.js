function urlEncode(value) {
	if (value instanceof Object) {
		return Object.keys(value).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(value[k])}`).join('&');
	} else {
		return encodeURIComponent(value);
	}
}

export function URL(strings, ...values) {
	let result = strings[0];
	values.forEach((val, idx) => {
		result += urlEncode(val) + strings[idx+1]
	})
	return result;
}

function createXHR(send) {
	return new Promise((success, error) => {
		const xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 ) {
				if (xhr.status >= 400) error(xhr.responseText);
				else success(xhr);
			}
		}
		send(xhr);
	})
}

export let HTTP = {

	get(url) {
		return createXHR(xhr => {
			xhr.open('GET', url);
			xhr.send();
		})
	},

	patch(url) {
		return createXHR(xhr => {
			xhr.open('PATCH', url);
			xhr.send();
		})
	},

	delete(url) {
		return createXHR(xhr => {
			xhr.open('DELETE', url);
			xhr.send();
		})
	},

	post(url, data, progress) {
		return createXHR(xhr => {
			if (progress) xhr.upload.addEventListener("progress", e => progress(e.loaded/e.total));
			xhr.open('POST', url);
			xhr.send(data);
		})
	}
};
