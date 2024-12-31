import axios from "axios";

let config = {
    "publicKey": process.env.publicTestKey,
    "productIdentity": "123788",
    "productName": "ShopSmart",
    "productUrl": "http://localhost:3000",
    "eventHandler": {
        onSuccess(payload) {
            console.log(payload);

            const data = {
                token: payload.token,
                amount: payload.amount/100,
            };

            axios.get('http://localhost:5000/api/payment', data)
                .then(response => {
                    console.log(response.data);
                    alert("Thank you for your generosity");
                })
                .catch(error => {
                    console.log(error);
                });
        },
        onError(error) {
            console.log(error);
        },
        onClose() {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING", "MOBILE_BANKING"],
};

export default config;