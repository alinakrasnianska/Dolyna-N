import axios from "axios";



const send_message = async (query) => {
   try {
      const response = await axios.post(
         'https://api.coze.com/open_api/v2/chat',
         {
            "bot_id": "7365517248599621638",
            "user": "7365516846923038726",
            "query": query,
         },
         {
            headers: {
               'Authorization': 'Bearer pat_RFgiimnWbLp7HXrwUiuovmDbaijwRHdMT0SzFU27gYynh6vULbqoWpxPDWjTQGeP',
               'Content-Type': 'application/json'
            }
         }
      );

      return response.data;
   } catch (error) {
      console.error(error);
   }
};



const botMSG = {
   send_message
}
export default botMSG