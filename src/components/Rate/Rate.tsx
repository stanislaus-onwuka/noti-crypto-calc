import './Rate.scss';

interface rateProps{
    currency: string;
    fromSymbol: string;
    fromValue: number;
    toSymbol: string;
    toValue: number;
    bgColor: string;
    bgShadow: string;
}



export default function Rate({currency,fromSymbol,fromValue,toSymbol,toValue,bgColor,bgShadow}:rateProps): JSX.Element {
    let roundedFromValue = Math.ceil(fromValue);

    return (
        <div className="rate" style={{backgroundColor: bgColor, boxShadow: `12px 11px 18px ${bgShadow}`}}>
            <h3 className="rate-title">{ currency }</h3>
            <div className='exchange-rate'>
                <p className="from-value">{`${fromSymbol}${roundedFromValue.toLocaleString('en-US')}`}</p>
                <div className='arrow'>
                    <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M63.0771 13.0607C63.6629 12.4749 63.6629 11.5251 63.0771 10.9393L53.5311 1.3934C52.9454 0.807611 51.9956 0.807611 51.4098 1.3934C50.824 1.97919 50.824 2.92893 51.4098 3.51472L59.8951 12L51.4098 20.4853C50.824 21.0711 50.824 22.0208 51.4098 22.6066C51.9956 23.1924 52.9454 23.1924 53.5311 22.6066L63.0771 13.0607ZM0.983643 13.5H62.0164V10.5H0.983643V13.5Z" fill="white"/>
                    </svg>
                </div>
                {
                    currency === 'naira' ? <p className="to-value">{`${toSymbol}${toValue}`}</p> : <p className="to-value">{`${toValue}${toSymbol}`}</p>
                }
            </div>
        </div>
    )
}