const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly',
    'https://www.googleapis.com/auth/spreadsheets'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

async function loadSavedCredentialsIfExist() {
    try {
        // const content = await fs.readFile(TOKEN_PATH);//read from file
        // const credentials = JSON.parse(content);
        // return null;
        const credentials = { "type": "authorized_user", "client_id": "1030087095753-tbthdd13ctgruq8jk3f31mdutkdnimei.apps.googleusercontent.com", "client_secret": "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", "refresh_token": "1//0g89WjmNh6zxzCgYIARAAGBASNwF-L9IrPREiKCPnAuZ7SN3IGRrSO8BV00PUVDF2wGl9GsKUmFJuF19V1J4OKilN124c7TPNJFY" }
        return google.auth.fromJSON(credentials);
    } catch (err) {
        return null;
    }
}


async function saveCredentials(client) {
    // const content = await fs.readFile(CREDENTIALS_PATH);
    // const keys = JSON.parse(content);
    const keys = {
        "installed": {
            "client_id": "1030087095753-tbthdd13ctgruq8jk3f31mdutkdnimei.apps.googleusercontent.com",
            "project_id": "bhumio-406316",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": "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",
            "redirect_uris": ["http://localhost"]
        }
    }

    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
}


async function authorize() {
    let client = await loadSavedCredentialsIfExist();
    if (client) {
        return client;
    }
    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}

module.exports = { authorize }

authorize()