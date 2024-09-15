'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchNewsByCategory, fetchNewsByTopic } from '@/services/news'
import Hamburger from "@/components/hamburger";

export default function Read({ params }) {
  const router = useRouter()
  const { lang } = params;
  const [news, setNews] = useState([]); // Array to store news
  const [offset, setOffset] = useState(''); // Offset string
  const [page, setPage] = useState('');
  const [pageHeader, setHeader] = useState('All news')

  function updateSettings(value) {
    let settings = JSON.parse(localStorage.getItem('settings'))
    settings = {...settings, ...value}
    localStorage.setItem('settings',JSON.stringify(settings))  
  }

  function initializeSettings() {
     // Check if settings already exist in localStorage
     const existingSettings = localStorage.getItem('settings');
    
     if (!existingSettings) {
       // Define default settings
       const settings = {
          isCustomNews: false,
          offset: {
            'all_news': '',
            'trending_news': '',
            'top_stories': ''
          },
          page: '1',
          lang: 'en',
          category : {
            label : "TOP STORIES",
            tag : "top_stories"
          },
          customTopic : {
            label : "Finance",
            tag : "FINANCE"
          }
       };
 
       // Save settings to localStorage
       localStorage.setItem('settings', JSON.stringify(settings));
     }
  }
  useEffect(()=>{
    initializeSettings()
    const {category, isCustomNews, customTopic }= JSON.parse(localStorage.getItem('settings'))
    if(isCustomNews){
      setHeader(customTopic.label);
      fetchNewsByTopicName()
    }else {
      setHeader(category.label);
      fetchNews();
    }
  },[]);


  //methods 
  const fetchNews = async () => {
    try {
      const response = await fetchNewsByCategory();
      setNews(response.data.news_list || []);
      setOffset(response.data.min_news_id || '');
      updateSettings()
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchNewsByTopicName = async () => {
    try {
      const response = await fetchNewsByTopic();
      setNews(response.data.news_list || []);
      setPage(response.data.page_num || '');
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  }
  
  const newsList = news.map(newsItem => {
    const { image_url, title,author_name,created_at,content,source_url,source_name} = newsItem.news_obj;
    let date = new Date(created_at);

    const timeOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    let time = date.toLocaleTimeString('en-US', timeOptions);

    const dayOptions = {
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    }
    let day = date.toLocaleDateString('en-GB', dayOptions);

    let publishedAt = `${time} on ${day}`
    return <div key={title} className="">
      <div className="flex xs:flex-col lg:flex-row p-2 shadow mb-5 text-black md:h-[700px] lg:max-h-72">
        <div className="lg:w-1/3 lg:pr-4">
          <img className="lg:h-60 w-full md:h-[400px] md:w-[484px] xs:h-[40vh] rounded" src={image_url}/>
        </div>
        <div className="lg:w-2/3 flex flex-col justify-between md:h-full">
          <div className="xs:pt-4 lg:pt-0">
            <h2 className="text-[18px] lg:text-[22px] font-extralight">{title}</h2>
            <p className="text-[12px] text-[#808290] font-light"><span className="font-serif font-medium"><b className="text-black">short</b> by {author_name} </span>/<span className="font-serif"> {publishedAt}</span></p>
            <p className="text-[16px] pt-2 leading-[22px] font-light">{content}</p>
          </div>
          <p className="xs:pt-4 content-end text-[12px]">read more at <a href={source_url} target="_blank"><b>{source_name}</b></a></p>
        </div>
      </div>
    </div>
  });




  return (
    <>
      <nav className="hidden md:flex item-center px-3 py-3 justify-center content-center bg-white sticky top-0 shadow-lg">
          <Hamburger/>
          <div>
              <img src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png" className="h-13 w-32"/>
          </div>
      </nav>
      <div className="flex flex-col items-center">
        {/* Below header shown on larger devices only */}
        <div className="hidden md:flex my-4 lg:w-[1080px]">
          <div className="bg-[#f44336] w-full md:px-8 xs:px-2 py-2 flex xs:flex-col lg:flex-row justify-between items-center text-center">
            <p>For the best experience use <a href="https://inshorts.com/mobile"><b>inshorts</b></a> app on your smartphone</p>
            <div className="flex">
              <img className="h-13 w-36" src="https://assets.inshorts.com/website_assets/images/appstore.png"/>
              <img className="h-13 w-36" src="https://assets.inshorts.com/website_assets/images/playstore.png"/>
            </div>
          </div>
        </div>
        {/* Below header shown for smaller devices */}
        <div className="flex md:hidden sticky top-0 bg-white w-full justify-center">
          <div className="py-2">
              <img src="/hamburger.svg" className="h-7 w-7 absolute left-2" onClick={()=>{router.push('/discover')}}/>
              <p className="text-[21px]">{pageHeader}</p>
          </div>
        </div>
        <div className="md:w-[500px] lg:w-[900px]">
          <div id="container">
            {newsList}
          </div>
        </div>
      </div>
    </>
  );
}
