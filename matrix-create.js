
const axios = require('axios');

function generateBasicAuthHeader(username, password) {
    return 'Basic ' + Buffer.from(username + ':' + password).toString('base64');
}

async function creatematrix(inputrequest) {
    
    const authHeader = generateBasicAuthHeader('SravyasriV@SFPART050640', 'Pragati@98');
    const matrixSapData = PreparematrixSAPdata(inputrequest);
    try {
        const matrixapiresponse = await axios.post('https://apisalesdemo8.successfactors.com/odata/v2/PositionMatrixRelationship', matrixSapData, {
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            }
        });
        const succresp = {
            data: JSON.stringify(matrixapiresponse.data),
            success: true
        }
        return succresp;
    }
    catch (error) {
        const errrdl = {
            code: error.response.data.error.code,
            message: error.response.data.error.message.value
        }
        const errresp = {
            success: false,
            errordetails: errrdl
        }
        return errresp;
    }
}


function PreparematrixSAPdata(matrixinpdata) {
    const matrixSapdata = {};
    Object.keys(matrixinpdata).forEach(
        key => {
            if (key !== 'Action') {
                matrixSapdata[key] = matrixinpdata[key];
            }
        })
    return matrixSapdata;
}

module.exports = {  creatematrix };
