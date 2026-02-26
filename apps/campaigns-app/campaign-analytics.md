---
description: Track the traffic and performance of your campaigns in detail
---

# Campaign Analytics

To set up Campaign Analytics on your custom funnels, from the Campaigns App main list view, click on your campaign name, or choose **View**, then **Integration.**

{% hint style="info" %}
Copy the script shown on **Session Tracking Integration** to every page of your funnel to enable session tracking in Campaigns App.

Campaigns using the [**Campaign Cart JS SDK**](https://developers.nextcommerce.com/docs/campaign-cart/) will automatically include Analytics on connected pages.
{% endhint %}

### Core Analytics

Campaign Analytics tracks the following top key metrics, filterable by date range:

* **Active Visitors** - current active users on-page
* **New Sessions** - total number of unique user sessions on the campaign during the date range&#x20;
* **Unique Visitors** - number of unique visits to a page during the date range
* **Carts Created** - the number of carts created by user activity on your page via the [**Campaigns API**](https://developers.nextcommerce.com/docs/api/admin/guides/external-checkout/#create-cart). In the context of custom funnels, a Cart is a collection of the unique customer's name, email address, and the contents of their shopping session  - products, quantity, price.
* **Sales** - total amount of sales generated, including post-checkout upsell revenue
* **Conversion Rate** - the number of sales divided by new sessions
* **AOV** - the average order value, derived by dividing the sales total amount by the number of sales

### **Events by Page**

Every URL that users have visited in your funnel is reflected in this list, with the following events broken down along with percentages to show rates by page, such as checkout conversion or upsell accept rate.

* **Unique Visitors -** number of unique visits to a page during the date range
* **Carts**
* **Orders**
* **Upsells**
* **Sales** - displays a total revenue value from the orders or upsell orders.&#x20;

### Performance by Device & Browser

View at a glance your traffic patterns and performance by device type and browser.  Conversion rates are shown by percentage to help identify areas for optimization.
