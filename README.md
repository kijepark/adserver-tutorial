<h1 align="center">
<img width="40" valign="bottom" src="https://image.flaticon.com/icons/svg/2165/2165703.svg">
Ad Server Development Guide
</h1>
<h5 align="center"> From A to Z of the ad sever, the guide explains how it works from planning to operation. </h5>  

*Read this in other languages: [English](README.md), [한국어](README.ko.md)*

## What's Ad Server

One of the most common ad servers we know is Google AdSense.  

When the website owner inserts the Google AdSense code into the website, the advertisement is sent to the corresponding location, and the revenue is distributed from Google according to the traffic generated from the website.

In this tutorial, you will learn about the operating principle of ad servers, from the creation of an advertiser's advertising campaign to sending an ad to the publisher's website. This will be done by learning about the core structure of ad servers such as ***Google Ads***, ***Criteo***, ***OpenX***, ***AdZerk***, and ***Geniee***, and trying out minimal functions.

## Before We Dive in

There are only three things you need to know about for ad server!  

**Administrators**: who execute appropriate ad campaigns to publishers and manages advertisers and publishers.  
**Publishers**: who post advertisements delivered from the administrator on their website and earn revenue by impression.  
**advertisers**: who create ad campaigns and pay for advertising.

The important reason is that it is the starting point for connected models as follows:  

**Advertiser → Campaign → Ad Item**  

## Folder Structure

```
src/
│    app.js
│    router.js
└──  controllers/
   │         adItem.js // advertisement management
   │         advertiser.js  // advertiser management
   │         campaign.js // ad campaign management
   │         campaignAssignment.js // ad campaign allocation management
   │         placement.js // zone allocation management
   │         publisher.js // publisher management
   │         report.js // statistics management
   │         zone.js // zone management
   ├── models/..
   └── routes/
              adServe.js // Ad campaign serving
              ..
```

## Advertiser

An advertiser is an individual or company that wants to place advertisements from the advertising zone of a specific publisher. The advertiser create and manage ad campaigns consisting of banner images and landing pages.  

## Publisher

A publisher is an individual or company that owns an advertising zone such as a website or newsletter. The publisher create and manage advertising areas, and provide transmitted advertisements to customers through advertising zones.

## How's Ad Campaign Delivered

### 1. Connect ad campaign to publisher's zone

To delivery an ad campaign, ad campaign has to be connected to the publisher’s zone. The campaign can be connected by creating a Placement.

#### Creating a Placement

Code sample
```javascript
var zoneID = 1342;
var campaignID = 52492;

Placement.create({
   "zone.id": zoneID, // Zone ID
   "advertisement.id": campaignID // Ad Campaign ID
});
```

Example response
```json
{
  "zone": {
    "id": 1342
  },
  "advertisement": {
    "id": 52492,
    "type": "campaign"
  },
  "id": 2134,
  "object": "placement",
}
```

This is how the ad campaign can be connected to the zone.

### 2. The connected ad campaign is exposed on the publisher’s website

Publishers inserts the zone tag into their website. The zone tag includes zone ID, and requests for appropriate ad campaign using the zone ID when a page is loaded.  

```html
<html>
   <head>
      <title> Publisher's Website </title>
   </head>
   <body>
      ...

      <!-- Ad Banner area start -->
      <iframe src="http://localhost/adserve?zone_id=1&type=iframe" 
        width="300" 
        height="250"></iframe>
      <!-- Ad Banner area end -->
      
      ...
   </body>
</html>
```

The assigned ad campaign is exposed on the zone of the publisher.

## How Does it Collect Ad Statistics  

Impressions are collected when the publisher request for the ad campaign.  
Clicks are collected when the audience clicks on the banner ad.  

The way to collect clicks is by generating a redirect URL, pass through to the ad server address when a audience clicks on the ad banner image, collect the clicks from the ad campaign, and then redirect the audience to the landing page of the ad.

Code sample
```javascript

router.get("/redirect", async function(req, res) {
   // ... omit ...

   // Increases number of clicks
   await Report.update(query, { $inc: { clicks: 1 } });

   // Redirects audience to the landing page 
   return res.redirect(adItem.location);
});
```

Therefore, the audience accesses the ad campaign through the following pattern:
**Click on the ad banner → bypass the ad server → go to the original link of the ad banner**

## Stuff I wanna include  

#### Conversion Tracking -

Statistics that can be collected include impressions, clicks, and conversions.  
The meaning of the conversion can be defined in various ways, An audience's subscription can be a conversion or a newsletter subscription.  

We describe these specific actions as conversions, and we use conversion pixels to collect a variety of conversions tailored to the needs of the advertiser.

##### What's Conversion Pixel  
This is the "image tag for requesting" that you use to track a specific action from an audience, which tracks the number of conversions for a specific element through the address value of the image tag.  

*ex: ```<img src="http://localhost/convert/track?ad_item_id=${AD_ITEM_ID}" />;```*  
In this, you can collect conversions from an ad item by inserting an conversion pixel tag.  

#### A/B Testing -  

Compares two ads within an ad campaign and automatically replaces an ad with a lower response rate with another ad.

#### Geographic Targeting -  

Ad campaigns are served to specific countries or regions.  

#### Behavioral Targeting -  

Ad campaigns are served based on specific audience behavior.  

#### Keywords Targeting -  

Ad campaigns are served to websites containing specific keywords.  

#### Retargeting -  

Ad campaigns are served based on data from websites visited by audience.

#### Cross-Device Advertising -  

Ad campaigns are served to specific audience, across devices.  

#### Cross-Channel Advertising -  

Ad campaigns are served to specific audience, across channels such as website, email, newsletter.  

## Getting Started  

*This ad server is using the database MongoDB*  
*Before you start, make sure MongoDB is installed on Localhost!*. 

- MongoDB v4.2.1

```bash
$ git clone https://github.com/kijepark/adserver-tutorial.git
$ cd adserver-tutorial
$ npm install
$ npm run build
$ npm run start
```
