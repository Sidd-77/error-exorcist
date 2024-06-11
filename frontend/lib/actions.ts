'use server';
import axios from "axios";
import { Axis3D } from "lucide-react";


export const getResponse = async (queryText: String, referenceText: String) => {
    let res = await axios.post("http://127.0.0.1:8000/gemini", {
        query: queryText,
        reference: referenceText,
    });
    return res.data;
}

// const fetchResult = () => {
//     setIsLoading(true);
//     console.log(queryText, referenceText);
//     axios
//       .post("http://127.0.0.1:8000/gemini", {
//         query: queryText,
//         reference: referenceText,
//       })
//       .then((res) => {
//         console.log("Query done");
//         console.log(res.data);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error(error);
//         setIsLoading(false);
//       });
// };