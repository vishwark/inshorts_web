export default function NewsReadLayout({
    children, // will be a page or nested layout
  }) {
    return (
      
      <section className="bg-white">
        {/* Include shared UI here e.g. a header or sidebar */}
        <nav className="hidden md:flex item-center px-3 py-3 justify-center content-center bg-white sticky top-0 shadow-lg">
            <div>
                <img src="https://assets.inshorts.com/website_assets/images/logo_inshorts.png" className="h-13 w-32"/>
            </div>
        </nav>
   
        {children}
        <div className="hidden md:flex bg-[#323232] py-5 justify-around md:flex-row xs:flex-col">
            <div className="flex items-center">
                <div>
                    <img className="w-40 h-12" src="https://assets.inshorts.com/website_assets/images/logo_footer.png"/>
                    <p><span>Inshorts</span> Pte. Ltd.</p>
                    <p>©COPYRIGHT 2024</p>
                </div>
                <div className="w-px h-full bg-[grey] mx-4"></div>
                <div>
                    <p>Contact Us</p>
                    <p><a href="https://inshorts.com/tnc" target="_blank">Terms and conditions</a> <br/> <a href="">Privacy policies</a></p>
                </div>
            </div>
            <div className="flex items-end">
                <img className="h-7 w-7 ml-4" src="https://assets.inshorts.com/website_assets/images/facebook.png"/>
                <img className="h-7 w-7 ml-4" src="https://assets.inshorts.com/website_assets/images/twitter.png"/>
                <img className="h-7 w-7 ml-4" src="https://assets.inshorts.com/website_assets/images/linkedin.png"/>
            </div>
        </div>
      </section>
    )
  }