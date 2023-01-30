const hubspot = require('@hubspot/api-client');

exports.main = async (event, callback) => {

  /*****
    How to use secrets
    Secrets are a way for you to save API keys or private apps and set them as a variable to use anywhere in your code
    Each secret needs to be defined like the example below
  *****/

  const hubspotClient = new hubspot.Client({
    accessToken: process.env.hstoken
  });

  const enteredDealStage = event.inputFields['enteredDealStage'];
  let daysInDealStage;
  try {
    /*Note: enteredDealStage is a custom Deal property of type Date Picker, set by a workflow. The result will be in milliseconds, so to get days divide by 1000 (for seconds),
    then by 60 (for minutes), then by 60 (for hours), then by 24 (for days) */
    daysInDealStage = ((Date.now() - enteredDealStage)/1000/60/60/24).toFixed(1); 
    console.log (daysInDealStage);
    
  } catch (err) {
    console.error(err);
    // We will automatically retry when the code fails because of a rate limiting error from the HubSpot API.
    throw err;
  }

  callback({
    outputFields: {
      daysInDealStage
    }
  });
}
