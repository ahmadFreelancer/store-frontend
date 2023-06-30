import "../index.css"



// ModalItems is Child of <CartModal>
export default function ModalItems({ data }) {

    return (
        <>
            <div className='row my-4 modalWrapperRow'>
                <div className='col-6'>
                    <img className='w-100' src={data.url} alt="" />
                </div>

                <div className='col-6 modalDetails'>
                    <span className="myBgDark mb-2 d-inline-block fs-5">Name:</span>
                    <h4 className='text-capitalize mb-4'>{data.name}</h4>
                    <span className="myBgDark mb-2 d-inline-block fs-5">Price:</span>
                    <h4>{data.price}</h4>
                    <hr />
                    <p className="btnYellow mb-2 px-3 d-inline-block">Quantity:</p>
                    <span>  {data.newQuantity}</span>
                </div>
            </div>
        </>
    )
}
