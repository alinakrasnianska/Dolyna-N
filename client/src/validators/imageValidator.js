const imageValidator = (image)=> {
   if(image){
      const lastDotIndex = image.name.lastIndexOf('.');
      const parts = image.name.slice(lastDotIndex);
         if(parts === '.png' || parts === '.jpeg' || parts === '.jpg'){
            return image
         }else{
            return `wrong format, image must be .png or .jpeg or .jpg. Not ${parts}`
         }
   }else{
      return "image must be selected";
   }
}


const descriptionValidator = (description)=>{
   if(description.trim() !== ''){
      if(description.length > 50 && description.length < 255){
         return description 
      }else{
         return "description must be longer than 50 characters and shorter than 255"
      }
   }else{
      return "description can not be empty"
   }
}

 
const ivalid = {
   imageValidator,
   descriptionValidator
}

export default ivalid