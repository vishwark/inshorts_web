"use-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Settings(){
    const router = useRouter();
    useEffect(()=>{
        const {lang} = JSON.parse(localStorage.getItem('settings'))
        setLanguage(lang);
    },[])
    const [selectLanguage, setLanguage]= useState('en')
    let bottomOptions = [
        {
            label : "Share this app",
        },
        {
            label : "Rate this app",
        },
        {
            label : "Feedback",
        },
        {
            label : "Privacy",
        }
    ]

    let bottomComponent = bottomOptions.map(item => (
        <div className="pl-[60px] py-7" key={item.label}>
            {item.label}
        </div>
    ));

    let langSelect = <select value={selectLanguage} onChange={handleLangChange} className="mr-5 pr-2">
                        <option value='en'>English</option>
                        <option value='hi'>हिंदी</option>
                    </select>
   function handleLangChange(evt){
        setLanguage(evt.target.value)
        console.log(evt.target.value,"111111111")
        let settings = JSON.parse(localStorage.getItem('settings'))
        settings = {...settings, lang: evt.target.value}
        localStorage.setItem('settings',JSON.stringify(settings))   
    }
    return <>
        <div>
            <div className="relative shadow sticky top-0 bg-white mb-4 flex justify-center py-2 px-2">
                <img onClick={()=>{router.back()}} src="/left-arrow.svg" className="h-6 w-6 absolute left-2 top-1/2 transform -translate-y-1/2 fill-blue-500"/>
                <div className="pl-2 self-center">Options</div>
            </div>

            <div className="px-4 shadow">
                <div className="flex justify-between py-5">
                    <div className="flex">
                        <img src="/Aa.svg" className="h-6 w-6 mr-[18px]"/>
                        <p>Language</p>
                    </div>
                    <p className="flex ">
                        {langSelect}
                        {/* <img src="/down-arrow.svg" className="fill-blue-500"/> */}
                    </p>
                </div>
                <div className="flex">
                    <div className="h-px w-6 mr-[18px]"/>
                    <div className="h-px w-full bg-gray-300"/>
                </div>
                
                <div className="flex justify-between py-5">
                    <div className="flex">
                        <img src="/bell.svg" className="h-6 w-6 mr-[18px]"/>
                        <p>Notifications</p>
                    </div>
                    <p>
                        Toggle
                    </p>
                </div>

            </div>
            <div>
                {bottomComponent}
            </div>
            
        </div>
  </>
}