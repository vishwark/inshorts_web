"use client"
import CategoryList from "@/components/category/category-list";
import SuggestedTopicGroup from "@/components/suggested-topics/suggested-topic-grid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { fetchNewsTopics } from '@/services/news'

export default function DiscoverPage(){
    const router = useRouter()
    const [suggestedTopics, setSuggestedTopics] = useState([]); 

    useEffect(()=>{
        fetchSuggestedTopics();
    },[])

    const fetchSuggestedTopics = async () => {
        try {
            let response = await fetchNewsTopics();
            setSuggestedTopics(response.data.trending_tags || []);
        } catch (error) {
          console.error('Error fetching news:', error);
        }
      };
    return <>
      <div className="shadow sticky top-0 bg-white mb-4 flex justify-between py-2 px-2 w-full">
        <div className="pl-2">Categories and Topics</div>
        <div className="flex">
            <img src="/settings.svg" alt="settings_ic" className="pr-2 h-6 w-6" onClick={()=>{
                router.push('/settings')
            }} />
            <img onClick={()=>{ router.back()}} alt="right_arrow" src="/right-arrow.svg" className="h-6 w-6"/>
        </div>
      </div>
      <CategoryList/>
      <SuggestedTopicGroup topics={suggestedTopics}/>
    </>
}

