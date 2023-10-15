import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import Spinner from "../../Spinner"
import axios from "axios";
import "./PaginationBar.css";


function Pagination(props) {
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:5555/books/getBookCount").then((response) => {
            setTotalPages(Math.ceil(response.data.data/props.limit))
            setLoading(false)

        }).catch((error) => {
            console.log("ERROR MESSAGE ::", error)
            setLoading(false)
        })
    },[]);

    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className='pagination'>
            <button onClick={() => props.currPage > 1 ? props.handleSetCurrentPage(props.currPage - 1) : props.handleSetCurrentPage(1)}><AiOutlineArrowLeft /></button>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => props.handleSetCurrentPage(page)}
                        className={page == props.currPage ? "active" : ""}>
                        {page}
                    </button>
                );
            })}
            <button onClick={() => props.currPage >= totalPages ? props.handleSetCurrentPage(props.currPage) : props.handleSetCurrentPage(props.currPage + 1)}><AiOutlineArrowRight /></button>
        </div>
    );
}

export default Pagination;