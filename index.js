const core = require('@actions/core');
const fetch = require('node-fetch')

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
      .then(response => response.json())
      .then(json =>  {
          if ('keptnContext' in json) {
              core.setOutput("keptnContext", json.keptnContext);
          } else {
              console.warn("WARN: No Keptn context found in response");
          }
        })
      .catch(err => console.error(err));
} catch (error) {
    core.setFailed(error.message);
}