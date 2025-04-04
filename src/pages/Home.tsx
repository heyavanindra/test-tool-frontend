import { Link } from "react-router"

const Home = () => {
  return (
    <div className="bg-black text-white h-screen w-full flex justify-center items-center">
        <div>
            <div>
              welcome to the api testing tool
            </div>
            <Link to={"/test"}></Link>
        </div>
    </div>
  )
}

export default Home