const khaltiConfig = {
  publicKey: "test_public_key_0713eb3c9e684be994feae24c451ff44",
  productIdentity: "1234567890",
  productName: "Shopping Cart",
  productUrl: "http://localhost:3000",
  eventHandler: {
    onSuccess(payload) {
      console.log("Payment successful", payload);
      alert("Payment Successful!");
    },
    onError(error) {
      console.error("Payment failed", error);
      alert("Payment Error!");
    },
    onClose() {
      console.log("Payment widget closed");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

export default khaltiConfig;
