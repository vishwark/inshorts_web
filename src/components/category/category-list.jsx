import { useEffect, useState } from "react"
import NewsCategoryTile from "./news-category-tile";
import { useRouter } from "next/navigation";

export default function CategoryList(){
    const router = useRouter()
    useEffect(()=>{
        const { category } = JSON.parse(localStorage.getItem('settings'))
        selectCategory(category.tag);
    },[])
    const [selectedCategory, selectCategory] = useState('top_stories');
    let newsCategories = [
        {
            img_url : 'https://inshorts.com/assets/images/cat_top_stories.png',
            isSelected : false,
            label : "TOP STORIES" ,
            tag : 'top_stories',
        },
        {
            img_url : 'https://inshorts.com/assets/images/cat_all_news.png',
            isSelected : false,
            label : "ALL NEWS",
            tag : 'all_news',
        },
        {
            img_url : 'https://inshorts.com/assets/images/cat_trending.png',
            isSelected : false,
            label : "TRENDING" ,
            tag : 'trending',
        },
        {
            img_url : 'https://inshorts.com/assets/images/cat_bookmarks.png',
            isSelected : false,
            label : 'BOOKMARKS',
            tag : 'bookmarks',
        }

    ];

    function changeCategory(category){
        let settings = JSON.parse(localStorage.getItem('settings'))
        settings = {...settings, category: { label : category.label, tag : category.tag},isCustomNews: false}
        localStorage.setItem('settings',JSON.stringify(settings))
        selectCategory(category.tag)
        router.back();
    }

    let list  = newsCategories.map(category=>{
        return <NewsCategoryTile
                key={category.tag}
                data={category}
                isSelected={category.tag === selectedCategory}
                onClick={() => changeCategory(category)}
            />
    })

    return <>
        <div className="flex flex-nowrap overflow-auto px-5 no-scrollbar">
            {list}
        </div>
    </>
};