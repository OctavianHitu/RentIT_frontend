import './pagination.scss'
export interface PaginationComponent{
    postsPerPage:number;
    totalposts:number;
    paginate:Function;
}

const PaginationNumbers=(props:PaginationComponent):JSX.Element=>{
    
    const pageNumbers =[];
    for(let i=1; i<=Math.ceil(props.totalposts/props.postsPerPage);i++){
        pageNumbers.push(i);
    }
    
    return(
        <div className='numbers-pag'>
            {pageNumbers.map((number)=>{
                return(
                    
                        <div key={number} className='pagination-number' onClick={()=>{
                            props.paginate(number)
                        }}>{number}</div>
                    
                )
            })}
        </div>
    )
    
    }
    export default PaginationNumbers;