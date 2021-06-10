import { ledgerId} from '../config';
export const publicJWT = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRhYmwtMzE0ZjA3MWMtMDlkMC00NTRmLWFlYmEtMzEyNjVkMmYwODY1In0.eyJpc3MiOiJodWIuZGFtbC5jb20vbG9naW4iLCJzdWIiOiJhbm9ueW1vdXMiLCJleHAiOjE2MjMzNzk4OTIsImh0dHBzOi8vZGFtbC5jb20vbGVkZ2VyLWFwaSI6eyJhY3RBcyI6WyJwdWJsaWMtdnFlMTR6bWJibHNsMzB0ZSJdLCJhcHBsaWNhdGlvbklkIjoiZGFtbGh1YiIsImxlZGdlcklkIjoidnFlMTR6bWJibHNsMzB0ZSIsInJlYWRBcyI6WyJwdWJsaWMtdnFlMTR6bWJibHNsMzB0ZSJdfSwib3duZXIiOiJldmVyeW9uZSIsInBhcnR5TmFtZSI6IlB1YmxpYyJ9.r_Yz_w1duRsQJgB1ZgZDemyt8TZ4gkhrKLfKCcnp9BSFCLfeF6rocaKHc35Vqez-VNCjKUW9uEUe5ldX-gUU98QM5IL8h-MS0xgTMSUZxZfMQS6qrrmjMepcveBz7uFO2vOPPH4zGjGL9fbDThoTEW2JHyUjMQU9LN-rjLnPiAQ'
const hubLedgerId = 'vqe14zmbblsl30te'
const isUsingHub = false;
const headers = {
    Authorization: 'Bearer '+ publicJWT,
    'Content-Type': 'application/json',

}
// https://hub.daml.com/docs/api/json/
// https://docs.daml.com/json-api/index.html
export const queryAsPublic = async () => {
    try {
        const result = await fetch(
            `https://api.projectdabl.com/data/${isUsingHub ? hubLedgerId : ledgerId}/v1/query`, 
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    templateIds: ["TokenArt:TokenOffer"]
                })
            }
        )
        console.log(result)
        return result.json()
    } catch (e) {
        console.log(e)
    }
    
}

export const exerciseByContractId = async (contractId: string, acceptingOwner: string, iouCid: string) => {
    const result = await fetch(
        `https://api.projectdabl.com/data/${ledgerId}/v1/exercise`, 
        {
            method: 'POST', 
            headers,
            body: JSON.stringify({
                templateId: "TokenArt:TokenOffer",
                contractId,
                choice: "AcceptOffer",
                argument: {
                    acceptingOwner: acceptingOwner, 
                    iouCid: iouCid
                }
            })
        }
    )
    console.log(result);
    return result.json();
}