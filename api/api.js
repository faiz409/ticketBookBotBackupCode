const axios = require('axios');

module.exports.getid = async (step) => {
    const res = await axios.get(`http://localhost:3080/ticket/${ step.values.id }`);
    const data = res.data;
    // console.log(data);
    return data;
};

module.exports.getdetails = async (step) => {
    const params = {
        userName: `${ step.values.userName }`,
        mobile: `${ step.values.mobile }`,
        mail: `${ step.values.mail }`,
        personNumber: `${ step.values.personNumber }`,
        amount: `${ step.values.amount }`,
        placeAndTime: `${ step.values.data }`
    };

    // console.log(params);
    const res = await axios.get('http://localhost:3080/ticket', { params });
    const data = res.data;
    return data;
};

module.exports.postid = async (step) => {
    const params = {
        userName: `${ step.values.userName }`,
        mobile: `${ step.values.mobile }`,
        mail: `${ step.values.mail }`,
        personNumber: `${ step.values.personNumber }`,
        amount: `${ step.values.amount }`,
        placeAndTime: `${ step.values.data }`
    };

    const res = await axios.post('http://localhost:3080/ticket', params);
    const data1 = res.data;
    return data1;
};

module.exports.deleteid = async (step) => {
    // const params = { id: `${ step.values.id }` };
    // console.log(params);
    const res = await axios.delete(`http://localhost:3080/ticket/${ step.values.id }`);
    return res;
};
