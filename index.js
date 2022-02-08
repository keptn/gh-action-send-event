const core = require('@actions/core');
const fetch = require('node-fetch')

function checkResponseStatus(res) {
    if(res.ok){
        return res
    } else {
        throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
    }
}

try {
    const apiURL = core.getInput('keptnApiUrl' , { required: true});
    const apiToken = core.getInput('keptnApiToken' , { required: true});
    const event = core.getInput('event', { required: true });
    console.log(`Keptn send event: ${event}`);

    fetch(apiURL, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'x-token' : apiToken,
        },
        body: event,
    })
      .then(checkResponseStatus)
      .then(response => response.json())
      .then(json =>  {
          if ('keptnContext' in json) {
              core.setOutput("keptnContext", json.keptnContext);
          } else {
              core.setFailed("ERROR: No Keptn context found in response");
          }
        })
      .catch(err => core.setFailed(err));
} catch (error) {
    core.setFailed(error.message);
}
