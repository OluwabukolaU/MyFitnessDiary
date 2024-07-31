import Header from "./Header"
import Secone from "./Section"

export default function Home(){
  
  

  
  return(
    <>
    <div className="flex flex-col space-y-24">
      <div className=" bg-green-700 rounded-b-custom-bottom flex flex-row"style={{ borderBottomLeftRadius: '200px', borderBottomRightRadius: '200px' }}>
        <Header/>
        <Secone/>
      </div>
      
      
    </div>
      
    </>
  )
}