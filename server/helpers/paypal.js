const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: "sandbox",
    client_id: "ATtYbdn0P78vuje9398g2Ug51OoCtvQuWZrESVezpNTQEAaaClMmNXRHf8Rig8J84txqUGw4-mqLAJTR",
    client_secret: "EAKEDpMRB36nDByOHfPsI8q9_pYhZ1ORBDRFDDEoJiKs5uSEN43Zf6EyNJF4j4xg-T1JygVUgU42uwXq",
});

module.exports = paypal;