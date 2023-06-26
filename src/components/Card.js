import { NavLink } from "react-router-dom"
import "../index.css"

//  Card is Child of Dashboard
export default function Card({data}) {
  
  return (
    
      <div className='col-3 mx-4 cardWrapper justify-content-center align-items-center'>
        <img className='cardImg rounded mb-2' src={data.url} alt="" />
        <h4 className="mb-2 mx-2 text-uppercase">{data.name}</h4>
        <hr />
        <span className="myBgDark mb-2 mx-2 d-inline-block">Brand:</span>
        <span>{data.company}</span> <br />
        <span className="myBgDark mb-2 mx-2 d-inline-block">Category: </span>
        <span>{data.category}</span> <br />
        <span className="myBgDark mb-2 mx-2 d-inline-block">Price: </span>
        <span>{data.price}</span>
        <hr />
        <NavLink className="ViewCartBtn" to={`/singleproduct/${data._id}`}>View Details</NavLink>
      </div>
    
  )
}
