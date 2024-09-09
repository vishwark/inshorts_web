import SuggestedTopicTile from "./suggested-topic-tile";
import { useRouter } from "next/navigation";


export default function SuggestedTopicGroup({ topics }) {  
    const router = useRouter();

    function clickTileClick(topic){
        let settings = JSON.parse(localStorage.getItem('settings'))
        settings = {...settings, customTopic: { label : topic.label, tag : topic.tag},isCustomNews: true}
        localStorage.setItem('settings',JSON.stringify(settings))
        router.back();
    }

    let tileGrp = topics.map((element, index) => (
        <div onClick={()=>{clickTileClick(element)}}>
            <SuggestedTopicTile className="h-[20vh] shadow rounded " key={index} tileData={element}/>
        </div>
    ));
    return <>
       <div className="px-2 py-6 ">
            <div className="pb-1">SUGGESTED TOPICS</div>
            <div className="w-5 h-0.5 bg-black mb-4"></div>
            <div className="grid grid-cols-3 gap-2">
                {tileGrp}
            </div>
       </div>
    </>
        
    ;
}
