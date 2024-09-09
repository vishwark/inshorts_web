export default function NewsCategoryTile({data,isSelected, onClick}){
    return <>
        <div onClick={onClick} className={`${isSelected? 'opacity-100' : 'opacity-50'} flex flex-col items-center mx-3 mt-2`}>
            <img src={data.img_url} alt="news_category" className="h-10 w-10 mx-8 mb-2"/>
            <p className={`text-[11px] text-grey text-nowrap ${isSelected? 'text-blue-300 font-medium':'' }`}>{data.label}</p>
        </div>
    </>
}