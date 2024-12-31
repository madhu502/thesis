import KhaltiCheckout from "khalti-checkout-web";
import React from "react";

const KhaltiButton = () => {
  const khaltiConfig = {
    publicKey: "test_public_key_0713eb3c9e684be994feae24c451ff44",
    productIdentity: "1234567890",
    productName: "Earpod",
    productUrl: "http://localhost:3000", // URL of the product
    eventHandler: {
      onSuccess(payload) {
        // Payment successful
        console.log("Payment Successful: ", payload);
        alert("Payment Successful!");
      },
      onError(error) {
        // Error handling
        console.error("Payment Error: ", error);
        alert("Payment Error!");
      },
      onClose() {
        // User closed the payment modal
        console.log("Payment Modal Closed");
      },
    },
    paymentPreference: [
      "KHALTI", // Pay via Khalti wallet
      "EBANKING", // Pay via e-Banking
      "MOBILE_BANKING", // Pay via Mobile Banking
      "CONNECT_IPS", // Pay via Connect IPS
      "SCT", // Pay via SCT card
    ],
  };

  const handlePay = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: 1000 }); // Amount in paisa (1000 paisa = 10 NPR)
  };

  return (
    <button
      onClick={handlePay}
      className="px-4 py-2 bg-purple-600 text-white rounded shadow-md hover:bg-purple-700"
    >
      Pay with Khalti
    </button>
  );
};

export default KhaltiButton;
