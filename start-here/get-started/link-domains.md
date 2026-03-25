---
description: Connect one or more domain names to your storefront and emails
icon: '3'
---

# Link Domains

{% hint style="warning" %}
**Using Campaigns?** Storefront domains and Campaign domains are configured in different places. This page covers **storefront domains** — used for checkout links, PayPal, Apple Pay, and your store's public-facing pages. To add or change a domain for a Campaign funnel, go to **Apps > Campaigns App > Settings > Add Domain**. See [**Campaigns App Domain Allowlist**](../../apps/campaigns-app/#configure-campaigns-app) for details.
{% endhint %}

## Domains

Next Commerce supports the use of vanity domain name(s) for your store.  Go to **Settings > Domains** to get your domain linked to your store.

Add, Delete, and designate a domain as your store's Primary domain from this view.

{% hint style="danger" %}
Every store requires a Primary Domain to be set up for live commerce to be enabled.
{% endhint %}

The Primary Domain is used for [**Checkout Links**](../../manage/customers/checkout-links.md) created from customer carts via the Dashboard, as well as other links to your storefront, including express and redirect payment methods such as [**PayPal**](../../features/payments/paypal.md) and [**Apple Pay**](../../features/payments/apple-pay.md).

You must point your domain name's DNS settings so that it will resolve to your NEXT store.

{% hint style="info" %}
Next Commerce strongly recommends [**Cloudflare**](https://www.cloudflare.com/plans/) for your domain names.  Cloudflare's Free account includes management tools to simplify your store setup, security, and administration. &#x20;
{% endhint %}

It’s important that both the root WWW and CNAME DNS settings are pointed to **dns.29next.store**

### **Email Sending Domains**

From the **Settings > Domains** view, you can view, edit, and **Add Email Sending Domains** to your store. &#x20;

{% hint style="warning" %}
For any Email Sending Domains that are set up, it is required to add DKIM verification records to your domain name's DNS settings to ensure email deliverability.
{% endhint %}

Click **Actions > View** to edit email verification settings:&#x20;

* CNAME records to add to your domain’s DNS records to enable **DKIM signing**, which ensures deliverability and reduces the chance of your store’s notifications ending up in customers’ spam folders.

To re-verify DNS settings for an Email Sending Domain that's been set up, select **Check DNS**. Note that it may take up to 12 hours for new DNS records to be recognized.
