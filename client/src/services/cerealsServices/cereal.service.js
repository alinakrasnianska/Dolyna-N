import axios from "axios";

const url = 'http://localhost:8000';

const getCereal = async () => {
   try {
      const response = await axios.get(url + '/getCereals')
      return response
   } catch (error) {
      console.log("failed to get cereals")
   }

}

const cereal = {
   getCereal
}

export default cereal