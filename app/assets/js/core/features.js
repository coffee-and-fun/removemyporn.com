let getUrlVars = async () => {
    return new Promise((resolve, reject) => {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
        });
        resolve(vars);

    });
};

export {
    getUrlVars
};