const local = {
    BASE_URL: 'http://192.168.0.73:7295',
};

const staging = {
    // BASE_URL: 'http://',
};

const production = {
    // BASE_URL: 'http://',
};

let Environment = local;

const env = process.env.REACT_APP_ENV;

if (env === 'local') Environment = local;
else if (env === 'staging') Environment = staging;
else if (env === 'prod') Environment = production;
else Environment = local; // fallback

export default Environment;
