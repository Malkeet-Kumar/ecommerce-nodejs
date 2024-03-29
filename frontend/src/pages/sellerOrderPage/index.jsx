import { useGetData } from '../../apis/apiCalls'
import { sellerOrders } from '../../apis/apiUrls'
import {useEffect, useState} from 'react'
import OrderTable from '../../components/sellerComponents/orderItem'
import style from './style.module.css'
import { message } from 'antd'
import useConfig from 'antd/es/config-provider/hooks/useConfig'
import { useContext } from 'react'
import SellerContext from '../../context/sellerContext'
export default function SellerOrderPage(){
    const [orders,setOrders] = useState([])
    const [centers,setCenters] = useState([])
    const [isError,setIsError] = useState(false)
    const [err,setErr] = useState("")
    const [loading,setLoading] = useState(false)

    const {seller} = useContext(SellerContext)

    const getData = async()=>{
        try {
        setIsError(p=>!p)
        setLoading(p=>!p)
        const res = await fetch(sellerOrders,{headers:{
            authorization:localStorage.getItem("token")
        },method:"GET"})
        if(res.ok){
            const data =  await res.json()
            setOrders(data.orders)
            setCenters(data.centers)
        } else {
            message.error("Something went wrong")    
        }
        setLoading(p=>!p)
    } catch (error) {
        setLoading(p=>!p)
        setIsError(p=>!p)
        setErr(error)
        message.error(error)
    }}

    useEffect(()=>{
        (seller.isLoggedIn)?
        getData():null
    },[])

    return(
        <div className={style.container}>
            {seller.isLoggedIn?<OrderTable data={orders} setData={setOrders} centers = {centers}/>:<h1>Please login to see orders</h1>}
        </div>
    )
}