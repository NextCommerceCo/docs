---
description: Protect your store from fraud and create custom rules-based order management
---

# MaxMind minFraud

Maxmind minFraud service provides real-time risk scoring and fraud analysis for payment services, allowing you to protect your brand from fraud and losses.  MaxMind sits in the payment flow between the submission of a payment request by the customer, and the relaying of that request to the payment app/gateway. &#x20;

{% hint style="info" %}
Maxmind is an App. Enable it via **Apps > Maxmind**
{% endhint %}

The MaxMind App leverages Maxmind minFraud in conjunction with MaxMind Custom Rules, allowing the creation of custom disposition rules to define the parameters under which orders should be accepted or rejected.&#x20;

### How to Setup Maxmind minFraud Integration

Navigate to **Apps > Maxmind** and choose Actions > Install.

<figure><img src="../.gitbook/assets/image (88).png" alt=""><figcaption><p>Maxmind App Install</p></figcaption></figure>

After installing maxmind, add your API User ID, License Key, and enable Maxmind riskScore Protection to start screening transcations with Maxmind.

<figure><img src="../.gitbook/assets/image (89).png" alt=""><figcaption></figcaption></figure>

### Maxmind minFraud Custom Rules

The fraud protection and disposition logic relies on Custom Rules within your Maxmind minFraud account. Below is an example of Maxmind Custom Rules for Rejecting or Accepting Transactions based on Risk Score. Your store will follow the Accept and Reject Dispositions based on your the rules you set up.

{% hint style="warning" %}
Ensure you have a custom disposition rule setup to reject transactions above your riskScore tolerance. We recommend rejecting all above a riskScore of 30.\
\
**Without custom rules configured, all transactions will be accepted.**&#x20;
{% endhint %}

<figure><img src="../.gitbook/assets/image (87).png" alt=""><figcaption><p>Maxmind Custom Rules</p></figcaption></figure>

### Reviewing minFraud Data&#x20;

For transactions screened through MaxMind’s service, the data returned to Next Commerce is stored in the MaxMind app logs.  To view the logs, navigate to Apps > Maxmind > Logs.

