<h1 align="center">
<img width="40" valign="bottom" src="https://image.flaticon.com/icons/svg/2165/2165703.svg">
광고 서버 개발 가이드
</h1>
<h5 align="center"> 광고 서버의 하나부터 열까지 기획부터 동작 방식까지 설명합니다. </h5>

## 광고 서버?

흔히 알고 있는 대표적인 광고 서버는 구글의 애드센스입니다.  
웹사이트 소유주가 구글 애드센스 코드를 웹사이트에 삽입하면, 해당 위치에 광고가 송출되고 이후 발생한 트래픽에 따라 구글로부터 수익을 배분받는 구조입니다.

이 튜토리얼에서는 ***Google Ads***, ***Criteo***, ***OpenX***, ***AdZerk***, ***Geniee***와 같은 광고 서버들의 핵심 구조를 구현하고 설명하여 광고주의 광고 캠페인 생성부터 매체사 웹사이트에 광고 송출까지, 최소한의 기능만을 구현하여 광고 서버의 동작 원리에 대해 쉽게 파악할 수 있습니다.

## 뛰어들기 전에!

광고 서버에서 가장 중요하게 알아야할 요소는 단 세가지!  

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

## 광고주(Advertiser) (작성 예정)

## 매체사(Publisher) (작성 예정)

## 광고 캠페인이 어떻게 송출되나요? (작성 예정)

## 광고 통계를 어떻게 수집하나요? (작성 예정)

## 광고 수익은 어떻게 배분되나요? (작성 예정)

## 시작하기  

*이 광고 서버는 데이터베이스 MongoDB를 사용하고 있습니다*  
*시작하기전 MongoDB가 Localhost에 설치되어 있는지 확인해주세요!*

```bash
$ git clone https://github.com/kijepark/adserver-tutorial.git
$ cd adserver-tutorial
$ npm install
$ npm start
```
