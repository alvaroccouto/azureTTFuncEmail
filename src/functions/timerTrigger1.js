const { app } = require('@azure/functions');
const { EmailClient } = require("@azure/communication-email");

app.timer('timerTrigger1', {
    schedule: '0 */1 * * * *',
    handler: async (myTimer, context) => {
        const connectionString = "endpoint=https://emailresourcetest.unitedstates.communication.azure.com/;accesskey=FHPjIsINK8kpJWcvh9WFfT74TbiVFPsvjdDb0M4nyLD4ake7dVXKJQQJ99ALACULyCpmOpKlAAAAAZCSkvCZ";

        const client = new EmailClient(connectionString);
        const emailMessage = {
            senderAddress: "DoNotReply@8d21a783-0299-4970-8950-53686bafca1b.azurecomm.net",
            content: {
                subject: "Test Email",
                plainText: "Hello world via email.",
                html: `
                <html>
                    <body>
                        <h1>Hello world via email.</h1>
                    </body>
                </html>`,
            },
            recipients: {
                to: [{ address: "alvaroccouto@gmail.com" }],
            },
            
        };
    
        const poller = await client.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        context.log('Timer function processed request.');
    }
});
