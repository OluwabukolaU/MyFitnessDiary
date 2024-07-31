import nut from './images/nut.png';
import phone from './images/phone.png';
import watch from './images/watch.png';
import food from './images/food.png';

export default function Secone() {
  return (
    <div className="flex flex-col lg:flex-row mt-32 space-y-10 lg:space-y-0 lg:space-x-10 px-4">
      <div className="flex flex-col text-white space-y-10 lg:w-2/5">
        <img className="w-8 h-8 mt-4" src={nut} alt="nut" />
        <h1 className="font-bold text-3xl md:text-4xl lg:text-6xl overflow-visible w-full lg:w-3/4 ml-0 lg:ml-8">
          Be Healthy for Life!
        </h1>
        <span className="text-yellow-400 text-xl md:text-2xl w-full lg:w-3/5 ml-0 lg:ml-8">
          My weight loss, diet, and nutrition assistant.
        </span>
      </div>
      <div className="w-full lg:w-2/4 flex flex-col lg:flex-row overflow-visible">
        <img src={phone} alt="phone" className="w-full lg:w-auto lg:-ml-7" />
        <div className="hidden lg:flex flex-col m-auto space-y-10 lg:space-y-0">
          <img className="w-8 h-8 lg:ml-20" src={nut} alt="nut" />
          <img className="w-8 h-8 mt-10 lg:mt-32" src={nut} alt="nut" />
          <img className="w-24 h-24 lg:w-56 lg:h-56" src={watch} alt="watch" />
        </div>
      </div>
      <div className="hidden lg:block w-full lg:w-auto">
        <img src={food} alt="food" className="w-full lg:w-auto lg:-mr-20" />
      </div>
    </div>
  );
}
