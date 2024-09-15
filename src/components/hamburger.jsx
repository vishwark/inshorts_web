import { useEffect, useState } from "react"
import { fetchNewsTopics } from '@/services/news'

export default function Hamburger(){
    const [showMenu, handleMenu]= useState(false)
    const [topics, setTopics] = useState([]);
    const [selectLanguage, setLanguage]= useState('en')

    useEffect(()=>{
        const {lang} = JSON.parse(localStorage.getItem('settings'))
        setLanguage(lang);
        fetchSuggestedTopics();
    },[selectLanguage])

    function handleLangChange(value){
        setLanguage(value)
        let settings = JSON.parse(localStorage.getItem('settings'))
        settings = {...settings, lang: value}
        localStorage.setItem('settings',JSON.stringify(settings))   
    }

    function handleMenuBar(value){
        handleMenu(value);
    }

    const fetchSuggestedTopics = async () => {
        try {
            let response = await fetchNewsTopics();
            let sideBarTopics = selectLanguage == 'en' ? response.data.trending_tags.filter(topic=>topic.relevance_tag) : response.data.trending_tags.slice(5)
            setTopics(sideBarTopics || []);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };

    let topicList  = topics.map((topic)=>{
        return <div className="px-7 divide-y divide-blue-200 py-1 text-white hover:bg-black hover:bg-opacity-25 hover:scale-110 cursor-pointer">
            {topic.label}
        </div>
    })

    let menu = <div id="menubar" className={`${showMenu ? 'push-right' : ''} h-full bg-[#303036] fixed left-[-250px] top-0`} style={{transition: "5s",zIndex:"1"}}>
                    <div className="ml-4 absolute right-[-48px] cursor-pointer text-black" onClick={()=>{handleMenuBar(!showMenu)}}>
                        <img src="/cross.svg" className="mt-4 h-8 w-8"/>
                    </div>
                    <div className="h-full flex flex-col justify-evenly">
                        <div className="flex border mx-4">
                            <div className={ `px-2 py-2 w-full cursor-pointer ${selectLanguage=='en'? 'bg-slate-300 text-black':'text-white'}`} onClick={()=>{ handleLangChange('en')}}>English</div>
                            <div className={ `px-2 py-2 w-full cursor-pointer ${selectLanguage=='hi'? 'bg-slate-300 text-black':'text-white'}`} onClick={()=>{ handleLangChange('hi')}}>हिन्दी</div>
                        </div>
                        <div className="mx-2 text-white divide-y divide-blue-200">Categories</div>
                        {topicList}
                    </div>
                </div>

    let menuButton = <div className={`absolute left-2 flex items-center cursor-pointer`}>
            <img src="/hamburger.svg" className="h-8 w-8" onClick={()=>{handleMenuBar(!showMenu)}}/>
            <span className="px-2">Menu</span>
        </div>

    
    return <>
        <div>
            {menu}
            {menuButton}
        </div>
    </>
}