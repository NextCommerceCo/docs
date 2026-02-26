---
description: >-
  Recover revenue and reduce subscriber churn with subscription decline salvage
  tools
---

# Decline Salvage

## Subscription Renewal Decline Salvage

When a subscription fails to renew due to a failed payment, NEXT helps you recover the payment and retain your customer with automated retry capabilities.&#x20;

Subscription renewal payments may fail for various reasons that are temporary, and often the best course of action is to simply retry the renewal at a later time and date.  When a renewal payment failure occurs, NEXT categorizes the reason to determine whether the issue is temporary and the renewal should be reattempted. &#x20;

#### Failed Payments Handling

To enable subscription renewal retries and control the settings, navigate to **Settings >  Subscriptions** from the Dashboard.

{% hint style="info" %}
**Payment Decline Types**

Soft Declines - may be reattempted again in the future.  Soft declines carry payment failure reason codes in the 2000 range.

Hard Declines - not recommended to retry, no automated reattempt occurs.  Decline reason codes in the 3000 range.

For more information, see[ **Transaction Response Codes**](../../features/payments/transaction-response-codes.md)
{% endhint %}

Subscriptions that fail renewal payment will be retried if Automatic Retry Mode is enabled.  While a subscription is retrying, the status will be “Retrying” and the “Next Retry Date” will be displayed in the subscription details.

#### Subscription Renewal Smart Retry

The optimized “Smart” retry schedule is based on aggregate data from industry leaders, tuned to provide the highest chance of recovery for subscribers, while minimizing decline transaction fees and ratios on your merchant account.

{% hint style="info" %}
Decline Salvage Schedule

* Attempt 1 - Retry 3 days after first decline at 2 PM in store timezone
* Attempt 2 - Retry on 1st or 16th of the month at 3 PM in store timezone
* Attempt 3 - Retry on the next upcoming Friday at 2 PM in store timezone
{% endhint %}

After all retries have completed, a subscription will transition to [**Past Due**](./#subscription-statuses) or [**Canceled**](./#subscription-statuses) depending on your store’s settings.
