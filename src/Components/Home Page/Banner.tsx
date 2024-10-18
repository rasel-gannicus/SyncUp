import { Cat, Bike, Dessert, } from 'lucide-react'
import { FaFootball } from 'react-icons/fa6'

export default function Banner() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-2 text-center mt-12 mb-10">
      <div className="relative mb-8">
        <h1 className="text-4xl md:text-5xl z-50 font-bold text-purple-900 leading-tight mb-4">
          Use Your Daily Apps
          <br />
          All in one place
        </h1>
        <div className="absolute -top-12 -left-4 md:left-0 -z-10">
          <div className="bg-green-100 rounded-full p-3">
            <Cat className="w-8 h-8 text-green-700" />
          </div>
        </div>
        <div className="absolute -top-8 right-0 md:right-12 -z-10">
          <div className="bg-yellow-100 rounded-full p-3">
            <Dessert className="w-8 h-8 text-yellow-800" />
          </div>
        </div>
        <div className="absolute -left-4 md:left-5 top-3/4 -z-10">
          <div className="bg-pink-100 rounded-full p-3">
            <Bike className="w-8 h-8 text-pink-500" />
          </div>
        </div>
        <div className="absolute -right-4 md:right-0 bottom-0 -z-10">
          <div className="bg-gray-200 rounded-full p-3">
            <FaFootball className="w-8 h-8 text-brown-500" />
          </div>
        </div>
      </div>
      {/* <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p> */}
      <button className="bg-pink-500 text-white font-semibold py-3 px-8 rounded-full hover:bg-pink-600 transition duration-300">
        Check Below
      </button>
    </div>
  )
}