import { UPLOAD_IMAGE_SUCCESS, UPDATE_TWEET_WITH_IMAGE } from "./image.type"

const uploadImageToServer = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
  
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Image upload failed");
      }
  
      const data = await response.json();
      return data.imageURL;
    } catch (error) {
      throw error;
    }
  };
  

export const uploadImage = (imageFile) => async (dispatch) => {
    try {
      const imageURL = await uploadImageToServer(imageFile);
  
      dispatch({ type: UPLOAD_IMAGE_SUCCESS, payload: imageURL });
    } catch (error) {
    }
  };
  
  export const updateTweetWithImage = (tweetId, imageURL) => (dispatch) => {
    dispatch({ type: UPDATE_TWEET_WITH_IMAGE, payload: { tweetId, imageURL } });
  };