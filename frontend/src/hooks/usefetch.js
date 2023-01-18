import { useEffect, useState } from "react"
import axios from "axios";
const useFetch = (url)=>{

    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(url).then(res=> {
            setLoading(false);
            setData(res.data)
        }).catch((err)=>{
            setLoading(false)
            setError(err.message)
        })
      }, [url])

      return {data, error, loading}

}

export default useFetch;

