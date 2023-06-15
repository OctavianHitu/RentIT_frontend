import { useState } from "react";
import { Car } from "../../context/carContext";
import './carPagins.scss'
import OffersPagination from "../offers-pagination/offersPagination";
import { Pagination } from "@mui/material";

interface carPaginsComponent{
    cars:Car[]
    postsPage:number;
}

const CarPagins =(props:carPaginsComponent):JSX.Element =>{

    const [currentPage,setCurrentPage]=useState(1);
    const [postsPerPage]=useState(props.postsPage);


    const indexOfLastPost= currentPage * postsPerPage;
    const indexOfFirstPost= indexOfLastPost - postsPerPage;
    const currentPosts = props.cars.slice(indexOfFirstPost,indexOfLastPost);

    const paginate = (pageNumber:any)=>{
        setCurrentPage(pageNumber)
    }


    return(
        <div className="car-pagins">
            <OffersPagination posts={currentPosts}/>
            <div className="pagin-numbers-mui">
            <Pagination  count={Math.ceil(props.cars.length/postsPerPage)}  onChange={(e:any)=>{paginate(e.target.textContent)}}/>

            </div>
        </div>
    )
}

export default CarPagins;