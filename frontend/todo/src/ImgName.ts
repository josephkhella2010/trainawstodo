/* export const imgUrl = {
  fotoPathOne: "/fruitHome1.jpg",
  fotoPathTwo: "/fruitHome2.jpg",
};
const BaseUrl='https://amplify-todolist-dev-b7d8b-deployment.s3.amazonaws.com/foto'

export const UrlImg = (imgPath:string|null) => {
  //"https://amplify-todolist-dev-b7d8b-deployment.s3.amazonaws.com/foto/fruitHome1.jpg";
  //'https://amplify-todolist-dev-b7d8b-deployment.s3.amazonaws.com' imgUrl='/foto/fruitHome1.jpg'
  `${BaseUrl}${imgPath}`;
};

 */
export const imgUrl = {
  fotoPathOne: "/fruitHome1.jpg",
  fotoPathTwo: "/fruitHome2.jpg",
};

const BaseUrl =
  "https://amplify-todolist-dev-b7d8b-deployment.s3.amazonaws.com/foto";

export const UrlImg = (imgPath: string | null) => {
  return `${BaseUrl}${imgPath}`;
};
