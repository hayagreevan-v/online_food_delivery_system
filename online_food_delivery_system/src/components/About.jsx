import aboutImage from "../assets/images/about-image.png";

export const About = () => {

    return (
        <div className="bg-white">
            <div className="p-24 grid grid-cols-2">
                <div className="">
                    <h2 className="text-2xl font-medium">About Us</h2>
                    <p className="text-lg">
                    <br></br>
                    <strong>CS19443 Database Management System Project.</strong><br></br>
                    Our project is a digital platform that allows customers to place orders for food from various restaurants or food establishments through the internet. The system typically consists of a website and mobile app that enables customers to browse menus, choose items, and pay for their orders. The common features available in our project is menu management, order management, payment processing, delivery management and customer management. Additionally the users can also give their feedback and reviews through our app.
                    The project was built and deployed using  
                         <strong> MERN Stack(React for Front end and MongoDB,Express and Node JS for Back end)</strong><br/>
                         <br></br>
                         Developed by
                        Team B6: <br></br><strong>Keerthana J - 210701118</strong> <br></br> <strong>Hayagreevan V - 210701080</strong> 
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}