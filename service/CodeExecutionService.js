const axios = require("axios");

class CodeExecutionService {
    static async executeCode(language, code) {
        const result = await axios.post('https://emkc.org/api/v1/piston/execute', {
            language,
            source: code
        });
        return result.data;
    }
}