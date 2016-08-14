/**
 * Created by smartrabbit on 16/8/12.
 * @flow
 */
'use strict';
var apiURL = {
    baseurl: 'http://v3.wufazhuce.com:8000/api',
    homePage: '/hp/bymonth/',
    readingCarousel: '/reading/carousel',
    readingIndex: '/reading/index/',
    essay: '/essay/',
    serialcontent: '/serialcontent/',
    question: '/question/',
    carouselList: '/reading/carousel/',
    carouselDetail:'/serialcontent/',
    movieList: '/movie/list/',
    movieDetail: '/movie/detail/',
};
export function getHome(date:string,callBack){
  fetch(apiURL.baseurl+apiURL.homePage+date)
  .then((response) => {
    var monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    let result = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    result = JSON.parse(jsonResult._bodyInit).data;
    let _result = [];
    for (let i = 0; i < result.length; i++) {
        let datap = result[i];
        let hpMarketTime = new Date(datap.hp_makettime.replace(' ','T'));
        datap.hp_day = hpMarketTime.getDate();
        datap.hp_month = monthdata[hpMarketTime.getMonth()];
        datap.hp_year = hpMarketTime.getFullYear();
        _result.push(datap);
    }
    callBack(_result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getMovieList(index:number,callBack) {

  fetch(apiURL.baseurl + apiURL.movieList + index)
  .then((response) =>{

    let result = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    result = JSON.parse(jsonResult._bodyInit).data;

    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getMovieDetail(id:string,callBack) {
  fetch(apiURL.baseurl + apiURL.movieDetail +id)
  .then((response) =>{
    let jsonResult=JSON.parse(JSON.stringify(response));
    callBack(JSON.parse(jsonResult._bodyInit).data);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getReadingCarousel(callBack) {
  fetch(apiURL.baseurl + apiURL.readingCarousel)
  .then((response) =>{
    let result = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    result = JSON.parse(jsonResult._bodyInit).data;
    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getReadingIndex(index,callBack) {
  fetch(apiURL.baseurl + apiURL.readingIndex+index)
  .then((response) =>{
    let datas = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    datas = JSON.parse(jsonResult._bodyInit).data;
    let result=[];
    var monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    for (var i = 0; i < datas.length; i++) {
        var items = datas[i].items;
        for (var j = 0; j < items.length; j++) {
            let hpMarketTime = new Date(items[j].time.replace(' ','T'));
            items[j].day = hpMarketTime.getDate();
            items[j].month = monthdata[hpMarketTime.getMonth()];
            items[j].year = hpMarketTime.getFullYear();
            items[j].showType1 = items[j].type == 1;
            items[j].showType2 = items[j].type == 2;
            items[j].showType3 = items[j].type == 3;

            result.push(items[j]);
        }
    }

    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getEssay(contentId,callBack) {
  fetch(apiURL.baseurl + apiURL.essay+contentId)
  .then((response) =>{

    let result = {};
    let jsonResult=JSON.parse(JSON.stringify(response));
    let data = JSON.parse(jsonResult._bodyInit).data;
    var monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    let hpMarketTime = new Date(data.hp_makettime.replace(' ','T'));
    result.year=hpMarketTime.getFullYear();
    result.month= monthdata[hpMarketTime.getMonth()];

    result.guide_word = data.guide_word;
    result.title = data.hp_title;
    result.author=data.hp_author;
    result.imgurl=data.author[0].web_url;

    result.content = data.hp_content;
    result.content = result.content.replace(/\r\n<br>\r\n/g,'\r\n')
    result.content = result.content.replace(/<br>/g,"")

    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}

export function getSerial(contentId,callBack) {
  fetch(apiURL.baseurl + apiURL.serialcontent+contentId)
  .then((response) =>{

    let result = {};
    let jsonResult=JSON.parse(JSON.stringify(response));
    let data = JSON.parse(jsonResult._bodyInit).data;
    var monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    let hpMarketTime = new Date(data.maketime.replace(' ','T'));
    result.year=hpMarketTime.getFullYear();
    result.month= monthdata[hpMarketTime.getMonth()];

    result.guide_word = data.excerpt;
    result.title = data.hp_title;
    result.author=data.author.user_name;
    result.imgurl=data.author.web_url;

    result.content = data.content;
    result.content = result.content.replace(/\r\n<br>\r\n/g,'\r\n')
    result.content = result.content.replace(/<br>/g,"")
    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getQuestion(contentId,callBack) {
  console.log('contentId:'+contentId);
  fetch(apiURL.baseurl + apiURL.question+contentId)
  .then((response) =>{
    console.log(response.text())
    let result = {};
    let jsonResult=JSON.parse(JSON.stringify(response));
    let data = JSON.parse(jsonResult._bodyInit).data;
    var monthdata = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
    'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
    let hpMarketTime = new Date(data.question_makettime.replace(' ','T'));
    result.year=hpMarketTime.getFullYear();
    result.month= monthdata[hpMarketTime.getMonth()];

    result.guide_word = data.guide_word;
    result.title = data.question_title;
    result.author=data.answer_title;
    result.content = data.answer_content;
    result.content = result.content.replace(/\r\n<br>\r\n/g,'\r\n')
    result.content = result.content.replace(/<br>/g,"")
    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getCarouselList(itemId,callBack) {
  fetch(apiURL.baseurl + apiURL.carouselList+itemId)
  .then((response) =>{
    let result = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    result = JSON.parse(jsonResult._bodyInit).data;
    for (let i = 0; i < result.length; i++) {
      var item = result[i];
      result[i].showType1 = item.type == 1;
      result[i].showType2 = item.type == 2;
      result[i].showType3 = item.type == 3;
    }
    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
export function getCarouselDetail(itemId,callBack) {

  fetch(apiURL.baseurl + apiURL.carouselDetail+itemId)
  .then((response) =>{
    console.log(response.text())
    let result = [];
    let jsonResult=JSON.parse(JSON.stringify(response));
    result = JSON.parse(jsonResult._bodyInit).data;


    result.content = result.content.replace(/<br>\r\n <br>\r\n/g,"          ")
    result.content = result.content.replace(/<br>\r\n<br>\r\n<br>\r\n/g,"")
    result.content = result.content.replace(/<br>/g,"")
    result.content = result.content.replace(/<strong>/g,"")
    result.content = result.content.replace(/<\/strong>/g,"")
    console.log(JSON.stringify(result))
    callBack(result);
  })
  .catch((error) => {
    console.warn(error);
  });
}
