export const getPinataImageString = async (ifpsHash: string) => {
    try {
        const response = await fetch(
            `https://gateway.pinata.cloud/ipfs/${ifpsHash}`,
            {
                method: 'GET',
            }
        )
        return response.json()
    } catch (e) {
        console.log('e', e)
    }

}