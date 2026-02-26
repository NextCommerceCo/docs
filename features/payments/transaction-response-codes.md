---
description: Reference for all payment transaction response codes
---

# Transaction Response Codes

Payment Transaction requests have many potential outcomes, with each gateway and processor having unique response codes.  Next Commerce codes and categorizes these into common response buckets, according to the following codes.

### Successful Transactions

Successful transactions are coded as 1000.<br>

| Code | Detail   |
| ---- | -------- |
| 1000 | Approved |

### Soft Declines

Soft declines are coded in the 2000 range and are the result of an issuer-level transaction failure. Soft declined transactions may potentially be successful if retried in the future.<br>

| Code | Detail                 | Decline Type |
| ---- | ---------------------- | ------------ |
| 2000 | Do Not Honor           | Soft         |
| 2001 | Insufficient Funds     | Soft         |
| 2002 | Limit Exceeded         | Soft         |
| 2003 | Processor Declined     | Soft         |
| 2004 | Authorization Required | Soft         |
| 2005 | Processing Error       | Soft         |

### Hard Declines

Hard declines are coded in the 3000 and 4000 ranges and are the result of an error, or an issuer rejection of a transaction that cannot be resolved without modifying the payment request. Hard declined transactions are not recommended to reattempt. &#x20;

For codes relating to invalid inputs by the customer, such as an invalid address, CVV, or card expiry date, the customer should correct the payment details before reattempting purchase.

| Code | Detail                                        | Decline Type |
| ---- | --------------------------------------------- | ------------ |
| 3000 | Additional Authorization Required             | Hard         |
| 3001 | Address Verification Failed                   | Hard         |
| 3002 | Invalid Card                                  | Hard         |
| 3003 | CVC Invalid                                   | Hard         |
| 3004 | Expiry Date Invalid                           | Hard         |
| 3005 | Card Number Invalid                           | Hard         |
| 3006 | Expired Card                                  | Hard         |
| 3007 | Invalid Transaction                           | Hard         |
| 3008 | Lost or Stolen Card / Pick Up Card            | Hard         |
| 3009 | Fraudulent Transaction                        | Hard         |
| 3010 | Hard Decline                                  | Hard         |
| 3011 | Merchant Error                                | Hard         |
| 3012 | Duplicate Transaction / Velocity Filter       | Hard         |
| 3013 | Issuer Error                                  | Hard         |
| 3014 | Refund Error                                  | Hard         |
| 3015 | Pick Up Card                                  | Hard         |
| 3016 | 3DS Authentication Failed                     | Hard         |
| 3017 | Blocked by Block List                         | Hard         |
| 4000 | Bank Account Declined                         | Hard         |
| 4001 | Bank Account Requires Additional Verification | Hard         |
| 4002 | Bank Account Routing Number Invalid           | Hard         |
| 4003 | Bank Account Does Not Support SEPA            | Hard         |

### Errors

Errors are coded in the 5000 range and indicate there is a problem with the payment method or with the payment provider.&#x20;

| Code | Detail                           | Decline Type |
| ---- | -------------------------------- | ------------ |
| 5000 | Payment Method Unsupported       | Error        |
| 5001 | Payment Method Failed            | Error        |
| 5003 | Payment Method Failed - Timeout  | Error        |
| 5004 | Payment Method Invalid Parameter | Error        |
| 5005 | Error Invalid Country Code       | Error        |
| 5006 | Invalid Cardholder Name          | Error        |
