<h1 align="center">
<img width="40" valign="bottom" src="https://image.flaticon.com/icons/svg/2165/2165703.svg">
광고 서버 개발 가이드
</h1>
<h5 align="center"> 광고 서버의 하나부터 열까지 기획부터 동작 방식까지 설명합니다. </h5>

*다른 언어로 읽기: [English](README.md), [한국어](README.ko.md)*

## 광고 서버?

흔히 알고 있는 대표적인 광고 서버는 구글의 애드센스입니다.  
웹사이트 소유주가 구글 애드센스 코드를 웹사이트에 삽입하면, 해당 위치에 광고가 송출되고 이후 발생한 트래픽에 따라 구글로부터 수익을 배분받는 구조입니다.

이 튜토리얼에서는 ***Google Ads***, ***Criteo***, ***OpenX***, ***AdZerk***, ***Geniee*** 같은 광고 서버들의 핵심 구조를 구현하고 설명하여 광고주의 광고 캠페인 생성부터 매체사 웹사이트에 광고 송출까지, 최소한의 기능만을 구현하여 광고 서버의 동작 원리에 대해 쉽게 파악할 수 있습니다.

## 뛰어들기 전에!

광고 서버에서 가장 중요하게 알아야 할 요소는 단 세 가지!  

적절한 광고 캠페인을 매체사에 집행하고, 광고주와 매체사를 관리하는 **관리자(Administrator)**  
관리자로부터 전달받은 광고를 웹사이트에 게재하고 노출당 수익을 얻는 **매체사(Publisher)**   
마지막으로 광고 캠페인을 생성하고 광고비를 지불하는 **광고주(Advertiser)**

중요한 이유는 다음과 같이 연결된 모델들의 시작점이기 때문입니다.  

**광고주(Advertiser) → 광고 캠페인(Campaign) → 광고물(Ad Item)**  

## 프로젝트의 구조

```
src/
│    app.js
│    router.js
└──  controllers/
   │         adItem.js // 광고물 관리
   │         advertiser.js  // 광고주 관리
   │         campaign.js // 광고 캠페인 관리
   │         campaignAssignment.js // 광고 캠페인 할당 관리
   │         placement.js // 광고 캠페인 영역 할당 관리
   │         publisher.js // 매체사 관리
   │         report.js // 통계 보고서 관리
   │         zone.js // 광고 게재 영역 관리
   ├── models/..
   └── routes/
              adServe.js // 광고 캠페인 송출
              ..
```

## 광고주(Advertiser)

광고주란 특정 매체사의 광고 영역으로부터, 광고를 게재하고자 하는 개인이나 회사입니다.  
배너 이미지와 랜딩 페이지로 구성된 광고 캠페인(ad campaign)을 생성 및 관리합니다.  

## 매체사(Publisher)

매체사란 웹사이트나 뉴스레터등 광고 영역(zone)를 소유한 개인이나 회사입니다.  
광고 영역을 생성 및 관리하며, 송출 받은 광고를 광고 영역을 통해 고객(audience)에게 제공합니다.  

## 광고 캠페인이 어떻게 송출되나요?

### 1. 광고 캠페인을 매체사의 영역에 연결합니다.

광고 캠페인을 송출하기 위해서는 광고 캠페인을 매체사의 영역에 연결해야 합니다.  
배치(placement)를 생성하여 광고 캠페인을 연결할 수 있습니다.  

#### 배치 생성(Create a Placement)

코드
```javascript
var zoneID = 1342;
var campaignID = 52492;

Placement.create({
   "zone.id": zoneID, // 광고 영역 아이디 값
   "advertisement.id": campaignID // 광고 캠페인 아이디 값
});
```

응답 예시
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

이를 통해 광고 영역(zone)에 광고 캠페인(ad campaign)이 연결됩니다.

### 2. 연결된 광고 캠페인이 매체사의 웹사이트를 통해 노출됩니다.

매체사는 영역 태그(zone tag)를 웹사이트 코드에 삽입합니다.  
영역 태그에는 영역 아이디 값이(zone ID) 포함되며, 페이지가 로드될 때 영역 아이디를 통해 적합한 광고 캠페인을 서버에 요청합니다.  

```html
<html>
   <head>
      <title> 매체사의 웹사이트 </title>
   </head>
   <body>
      ...

      <!-- 광고 영역 시작 -->
      <iframe src="http://localhost/adserve?zone_id=1&type=iframe" 
        width="300" 
        height="250"></iframe>
      <!-- 광고 영역 종료 -->
      
      ...
   </body>
</html>
```

위 단계들을 통해서 할당된 광고 캠페인이 매체사의 영역을 통해 노출됩니다.

## 광고 통계를 어떻게 수집하나요?  

노출수(impressions)는 매체사가 광고 캠페인을 요청할 때 수집됩니다.  
클릭수(clicks)는 고객(audience)가 광고 배너를 클릭할 때 수집됩니다.  

클릭수를 수집하는 방법은 Redirect URL을 생성하여, 고객이 광고 배너 이미지를 클릭하면 광고 서버 주소로 경유한 이후 해당 광고 캠페인의 클릭수를 수집하고 나서 다시 고객을 광고물의 랜딩페이지로 Redirect 시키는 방식입니다.

코드
```javascript

router.get("/redirect", async function(req, res) {
   // ... 생략 ...

   // 클릭수 수집
   await Report.update(query, { $inc: { clicks: 1 } });

   // 수집 이후 고객(Audience) Redirection
   return res.redirect(adItem.location);
});
```

따라서 고객의 접속 패턴은 다음과 같습니다  
**광고 배너 클릭 → 광고 서버를 경유 → 광고 배너의 원래 연결 주소로 이동**  

## 구현 예정 기능  

#### 전환 추적(Conversion Tracking) -

수집할 수 있는 통곗값은 노출수와 클릭수 그리고 전환(conversion)의 개념이 있습니다.  
전환의 의미는 다양하게 정의될 수 있습니다. 고객의 회원가입이 전환일 수도 있고, 뉴스레터 구독이 될 수도 있습니다.  
이런 특정한 액션을 전환이라고 표현하며 광고주의 요구에 맞는 다양한 전환을 수집하기 위해 전환 픽셀을 사용합니다.  

##### 전환 픽셀(conversion pixel)이란?  
고객의 특정 액션을 추적하기 위해 사용하는 "요청 발생용 이미지 태그"로 이미지 태그의 주소 값을 통해 특정 요소의 전환수를 추적합니다.  

*예시: ```<img src="http://localhost/convert/track?ad_item_id=${AD_ITEM_ID}" />;```*  
위 예시는 이미지 태그를 삽입하여 광고물(ad item)의 전환수를 수집할 수 있습니다.  

#### A/B 테스트 (A/B Testing) -  

광고 캠페인 내에서 두 개의 광고를 비교하여 응답률이 낮은 광고를 다른 광고로 자동으로 치환합니다.

#### 지역 타겟팅(Geographic Targeting) -  

광고 캠페인이 특정 나라나 지역에 송출됩니다.  

#### 행동 타겟팅(Behavioral Targeting) -  

광고 캠페인이 특정 고객의 행동을 기반으로 송출됩니다.  

#### 키워드 타겟팅(Keywords Targeting) -  

광고 캠페인이 특정 키워드를 포함한 웹사이트에 송출됩니다.   

#### 리타겟팅(Retargeitng) -  

광고 캠페인이 고객이 방문한 웹사이트의 데이터를 기반으로 노출되는 것

#### 교차 기기 광고(Cross-Device Advertising) -  

광고 캠페인이 디바이스를 공유하며 노출되는 것  

#### 교차 채널 광고(Cross-Channel Advertising) -  

광고 캠페인이 웹사이트, 이메일, 뉴스레터등 채널을 공유하며 노출되는 것  

## 시작하기  

*이 광고 서버는 데이터베이스 MongoDB를 사용하고 있습니다*  
*시작하기 전 MongoDB가 Localhost에 설치되어 있는지 확인해주세요!*. 

- MongoDB v4.2.1

```bash
$ git clone https://github.com/kijepark/adserver-tutorial.git
$ cd adserver-tutorial
$ npm install
$ npm run build
$ npm run start
```
