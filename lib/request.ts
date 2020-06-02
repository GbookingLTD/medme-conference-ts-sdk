import * as fetch from 'node-fetch';

export async function apiRequest(httpMethod: string, endpoint: string, params?: object): Promise<any> {
    const jsonRequest = JSON.stringify(params);
    console.debug('<--', jsonRequest);

    const opts = {
        method: httpMethod.toUpperCase(),
        headers: {
            'Content-Type': 'application/json'
        },
        body: undefined
    };

    if (httpMethod === 'POST')
        opts.body = jsonRequest;

    // @ts-ignore
    const res = await fetch(endpoint, opts);
    const json = await res.text();
    console.debug('-->', json)
    const obj = JSON.parse(json);
    if (obj.status !== 'OK')
        throw {apiError: true, response: obj};
    return obj;
}

