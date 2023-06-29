import React, { useEffect, useReducer, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./index.css"
import { UseProductContext } from './context/ProductsContext';
import Card from './components/Card';
import { AiOutlineYoutube } from "react-icons/ai"


export default function Dashboard() {
    const { products, page, categoryQuery, companyQuery, sortQuery, resetQuery, prevPageFunc, nextPageFunc, nextBtnDisable } = UseProductContext();
    const [autoPlay, setAutoplay] = useState('')

    const navigate = useNavigate();

    // Check if user has token, if not, then logout
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        else { }
    }, [])

    const categoryParam = (e) => {
        let queryParams = e.target.value;
        categoryQuery(queryParams);
    }
    const companyParam = (e) => {
        let queryParams = e.target.value;
        companyQuery(queryParams);
    }
    const sortParam = (e) => {
        let queryParams = '';
        if (e.target.value === 'Price Ascending') { queryParams = 'sort=price' }
        if (e.target.value === 'Price Descending') { queryParams = 'sort=-price' }
        if (e.target.value === 'A to Z') { queryParams = 'sort=name' }
        if (e.target.value === 'Z to A') { queryParams = 'sort=-name' }
        sortQuery(queryParams);
    }

    const resetParam = () => {
        resetQuery();
    }

    const prevPage = () => {
        prevPageFunc()
    }
    const nextPage = () => {
        nextPageFunc()
    }

    useEffect(() => {
        setTimeout(() => {
            let btn = document.querySelector(".watchBtn");
            btn.style.display = "flex"
            btn.click()
        }, 3000);
    }, [])


    return (
        <>
            <button onClick={() => {
                setAutoplay('embed/LPtZYrM-Om4?rel=0')
            }} type="button" className="watchBtn position-absolute" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <AiOutlineYoutube className='w-100' />
            </button>
            <div onClick={() => setAutoplay('')} className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content border-0">
                        <div className="videoWrapperShow videoWrapper d-flex justify-content-center align-items-center">
                            <div className="videoInner embed-responsive embed-responsive-16by9 position-absolute">
                                <iframe className="videoContent embed-responsive-item" src={`https://www.youtube.com/${autoPlay}`} allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='dashboardWrapper'>
                <div className='dashboardInner container text-center'>
                    <h1 className='heroH1' style={{ fontSize: "54px" }}>Furniture For Your Sweet Home</h1>
                    <hr />
                    <p className="heroPara" style={{ fontSize: "20px" }}>Get your furniture delivered at your doorsteps all day everyday</p>
                </div>
            </div>
            <div>
                <div className='row mx-0 my-5 filtersSectionWrapper'>

                    {/* Filters Left Side */}

                    <div className='col-3 leftFilters'>
                        <h4 className='filtersH4'>Filter By: Category</h4> <br />
                        <div>
                            <input onClick={resetParam} className='filterItem' value='All' readOnly />
                            <input onClick={categoryParam} className='filterItem' value='Table' readOnly />
                            <input onClick={categoryParam} className='filterItem' value='Bed' readOnly />
                            <input onClick={categoryParam} className='filterItem' value='Sofa' readOnly />
                            <input onClick={categoryParam} className='filterItem' value='Chair' readOnly />
                        </div>

                        <h4 className='filtersH4'>Filter By: Company</h4> <br />
                        <div>
                            <input onClick={companyParam} className='filterItem' value='Ikea' readOnly />
                            <input onClick={companyParam} className='filterItem' value='Caressa' readOnly />
                            <input onClick={companyParam} className='filterItem' value='Marcos' readOnly />
                            <input onClick={companyParam} className='filterItem' value='Liddy' readOnly />
                        </div>

                    </div>

                    {/* Products Right Side */}

                    <div className='col-9 rightFilters'>
                        <div className='row justify-content-center'>
                            <form action="" className='mb-4 d-flex justify-content-end'>
                                <select name="sortSelect" id="sortSelect" onChange={sortParam}>
                                    <option disabled >Sort</option>
                                    <option selected>A to Z</option>
                                    <option>Z to A</option>
                                    <option>Price Ascending</option>
                                    <option>Price Descending</option>
                                </select>
                            </form>
                            {
                                products.map((data, index) => {
                                    return <Card key={index} data={data} />
                                })
                            }
                            <div className='pagination d-flex justify-content-around align-items-center'>
                                <button onClick={prevPage} className='prev btn btn-primary' disabled={page === 1}>Prev</button>
                                <button onClick={nextPage} className='next btn btn-primary' disabled={nextBtnDisable}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}
