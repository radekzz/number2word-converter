export default {
    fetchFilteredT9conversions(data) {
        return fetch('/api/convert', {
            body: JSON.stringify(data), // must match 'Content-Type' header
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
    }
}