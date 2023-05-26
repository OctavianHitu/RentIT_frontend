import './rentit.scss'

interface RentitComponent{
    fontSize:number;
}

const Rentit: React.FC<RentitComponent> = (props): JSX.Element => {

    return(
    <div className="rentit" style={{fontSize:`${props.fontSize}px`}}>
        RENT<span className='it'>IT</span>
    </div>
    )
}

export default Rentit;