import axios from "axios";
export default axios.create({
    baseURL:'https://api.rawg.io/api',
    params:{
        key:'1e81f849a49846558747ca953ed2894a'
    }
    
})