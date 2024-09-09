export default function SuggestedTopicTile({tileData,className}){
    return <>
         <div className={`${className} border border-sky-500`} 
            style={{
                display: "flex",
                flexDirection : "column",
                justifyContent: "flex-end",
                backgroundImage: ` url(${tileData.image_url})`,
                backgroundSize: 'cover', // Optional: Adjusts how the image fits the div
                backgroundPosition: 'center', // Optional: Centers the image within the div
                width: '100%', // Set a width or use a class to control the size
            }}
         >
            <div style={{
                display: "flex",
                flexDirection : "column",
                justifyContent: "flex-end",
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.1),rgba(255, 255, 255, 0.8))',
                height : "100%",
                width: "100%"
            }}>
                <p className="px-1 py-1 text-black text-[3.5vw] leading-0">
                  {tileData.label}
                </p>
            </div>
        </div>
    </>
}