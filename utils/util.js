// "faxpagegroup": {
//     "application": [{
//         "practice": "8042",
//         "departmentid": "2430",
//         "categories": [{
//             "category": "ADMIN",
//             "fpgdata": {
//                 "PATIENTDOB": "09/02/1992",
//                 "PATIENTNAME": "ANGERSTEIN MEGAN"
//             }
//         }]
//     }]
// }
var prettyjson = require('prettyjson');

module.exports = {
    callback: (error, data) => {
        if (error) {
            console.error(' Callack called, Error occured ');
        } else
            return data;
    },
    extract_fpg_details: (practice, category) => {
        return new Promise((resolve, reject) => {
            require('./settings_util').then((practiceSettings) => {

                // console.log(' Inside extract_fpg_details\n',prettyjson.render(practiceSettings));
                let fpgdata = {};
                if (practiceSettings.user && practiceSettings.user.login_username && practiceSettings.user.login_password) {
                    fpgdata['USERNAME'] = practiceSettings.user.login_username;
                    fpgdata['PASSWORD'] = practiceSettings.user.login_password;
                }
                // console.log(' FPG data about step 1 ', prettyjson.render(practiceSettings.faxpagegroup.application));
                if (practiceSettings.faxpagegroup && practiceSettings.faxpagegroup.application) {
                    practiceSettings.faxpagegroup.application.map((currpractice) => {
                        if (practice === currpractice.practice) {
                            fpgdata['PRACTICEID'] = currpractice.practice;
                            fpgdata['DEPARTMENTID'] = currpractice.departmentid;
                            currpractice.categories.map((category_based_data) => {
                                if (category_based_data.category === category) {
                                    fpgdata['PATIENTDOB'] = category_based_data.fpgdata.PATIENTDOB;
                                    fpgdata['PATIENTNAME'] = category_based_data.fpgdata.PATIENTNAME;
                                }
                            })
                        }
                    })
                    console.log(' FPG data about ot resolve ', fpgdata);
                    resolve(fpgdata);
                } else {
                    reject(new Error(' Looks like no application in practice_json file'));
                }
            }).catch(err => {
                reject(new Error(' Error reading configuration from practice_json file', err));
            });
        });
    }
};