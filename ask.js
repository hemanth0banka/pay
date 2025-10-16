const {GoogleGenAI} = require('@google/genai')
const ai = new GoogleGenAI({
    apiKey : 'AIzaSyARv4wtfW8skUlSHzOD-PIQD-NdFRdSvnM'
})

const ask = async (prompt)=>{
    try
    {
        const a = await ai.models.generateContent({
            model : 'gemini-2.5-flash',
            contents : prompt
        })
        return a.text
    }
    catch(e)
    {
        throw e
    }
}
module.exports = ask