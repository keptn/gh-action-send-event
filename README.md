# gh-action-send-event

GH Action to send an event to a Keptn deployment

## Parameters

### Input Paramters
| Name | Mandatory | Format | Description |
|--|--|--|--|
| keptnApiUrl | yes | url | URL pointing to the keptn events API (Example: http://example.nip.io/api/v1/event ) | 
| keptnApiToken | yes | string | API Token to be used for sending the event |
| event | yes | JSON | Event to be sent (See: [Keptn Cloud Events](https://www.google.com/search?q=keptn%20spec)) | 
  

## Example Usage

The following example uses this Github Action to send an event which triggers a sequence called `delivery`
whenever something is pushed to the repository.

```yaml
name: Keptn Send Event
on: [push]

jobs:
  send_keptn_event:
    runs-on: ubuntu-latest
    name: Sends Keptn Events
    steps:
    - name: Checkout
      uses: actions/checkout@v2
    - name: Send Keptn Event
      id: send-keptn-event
      uses: keptn/gh-action-send-event@main
      with:
        keptnApiUrl: ${{ secrets.KEPTN_API_URL }}
        keptnApiToken: ${{ secrets.KEPTN_API_TOKEN }}
        event: |
          {
            "data": {
              "configurationChange": {
                "values": {
                  "image": "docker.io/mongo:4.2.2"
                }
              },
              "deployment": {
                "deploymentstrategy": "direct"
              },
              "message": "",
              "project": "sockshop2",
              "result": "",
              "service": "carts-db",
              "stage": "dev",
              "status": ""
            },
            "source": "gh",
            "specversion": "1.0",
            "type": "sh.keptn.event.dev.delivery.triggered",
            "shkeptnspecversion": "0.2.1"
          }
```

*Note that the fields `shkeptncontext`, `time` and `id` are omitted **on purpose** because these will be generated automatically
by the API endpoint of Keptn.*