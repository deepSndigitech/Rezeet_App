import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


// const BASEURL = "https://dev.rezeet.io/api"
const BASEURL = "http://54.210.49.103:3000/api"
// const BASEURL = "https://dev.rezeet.io/api/"
// const BASEURL = "http://34.230.1.59:3000/api"

// const IMAGEUPLORD = "https://dev.rezeet.io/api/user/profile/image/update"
const IMAGEUPLORD = "http://54.210.49.103:3000/api/user/profile/image/update"
// const IMAGEUPLORD = "https://api.cmemove.com/api/moving/service/upload/image"

const USERURl = `${BASEURL}/user`



export const apimethods = {
    P: 'post',
    G: 'get',
    D: 'delete',
}



export const apiRoutes = {
    register: `${USERURl}/signup`,
    logIn: `${USERURl}/login`,
    forgetPass: `${USERURl}/password/forgot`,
    forgetPassupdate: `${USERURl}/password/reset`,
    verification: `${USERURl}/account/verification`,
    contectOtpSend: `${BASEURL}/user/contact/otp/send`,
    contectVarfy: `${BASEURL}/user/contact/otp/verify`,
    emailOtpSend: `${BASEURL}/user/email/otp/send`,
    emailVarify: `${BASEURL}/user/email/otp/verify`,
    profiledata: `${BASEURL}/user/profile/get/details`,

    profileUpdate: `${BASEURL}/user/profile/update`,
    getAllRecipt: `${BASEURL}/receipt/get/all`,
    changeCategory: `${BASEURL}/receipt/change/category`,
    getRecentData: `${BASEURL}/receipt/recent/get`,
    saveRecipt: `${BASEURL}/receipt/save`,
    scanwithoutLogin: `${BASEURL}/user/scan/with/out/login`,
    deleteReci: `${BASEURL}/receipt/delete`,
    generateRecipt: `${USERURl}/generate/invoice`,

    // imageApi: `${USERURl}/service/upload/image`,
    // junkHauler: `${BASEURL}/moving/service/add/junk/hauler`,
    // airFlight: `${BASEURL}/moving/service/add/air/freight`,
    // seaFlight: `${BASEURL}/moving/service/add/sea/freight`,
    // ToWareHouse: `${BASEURL}/moving/service/add/to/warehouse`,
    // FromWherehouse: `${BASEURL}/moving/service/add/from/warehouse`,
    // Wepackers: `${BASEURL}/moving/service/add/we/packer`,
    // addHouse: `${BASEURL}/moving/service/add/house`,
    // truckRent: `${BASEURL}/moving/service/add/truck/rental`,
    // feedbackAdd: `${BASEURL}/feedback/add`,
    // getProfile: `${BASEURL}/user/get/details`,
    // addOffice: `${BASEURL}/moving/service/add/office`,
    // containerRent: `${BASEURL}/moving/service/add/container/rental`,
    // addStorage: `${BASEURL}/moving/service/add/storage`,
    // updateProfile: `${BASEURL}/user/update/profile`,
    // getquotation: `${BASEURL}/quotation/get/by/userId`,
    // ApproveQueto: `${BASEURL}/quotation/change/status`,
    // getAllProduct: `${BASEURL}/product/user/get/all`,
    // getProducyByID: `${BASEURL}/product/user/get/byProductId`,
    // addToCart: `${BASEURL}/cart/add/to/cart`,
    // getCartItems: `${BASEURL}/cart/get/by/userId`,
    // getRecentView: `${BASEURL}/product/user/get/recent/view/product`,
    // removeItem: `${BASEURL}/cart/remove/product`,
    // ServiceAreaCheack: `${BASEURL}/service/area/check`,
    // getOffer: `${BASEURL}/trending/get/all`,
    // getProductFromVenderId: `${BASEURL}/product/user/get/all/product/by/vendorId`,
    // getBrand: `${BASEURL}/product/get/brands`,
    // getAddress: `${BASEURL}/user/address/get`,
    // addAdress: `${BASEURL}/user/address/add`,
    // removeAddress: `${BASEURL}/user/address/delete`,
    // placeOrder: `${BASEURL}/order/place`,
    // getFilterId: `${BASEURL}/product/user/get/filtered/product`,
    // getOrders: `${BASEURL}/vendor/order/get/all/for/user`,
    // createPayment: `${BASEURL}/transaction/create`,
    // createPaymentMover: `${BASEURL}/transaction/movers/packers/create`,
    // sucessPayment: `${BASEURL}/transaction/success`,
    // cancelPayment: `${BASEURL}/transaction/cancel`,
    // getTag: `${BASEURL}/product/user/get/all/tag`,
    // planbySpace: `${BASEURL}/product/user/get/all/product/by/tag`,
    // productReview: `${BASEURL}/rating/review/product/add`,
    // sucessPaymentMover: `${BASEURL}/transaction/movers/packers/success`,
    // cancelPaymentMover: `${BASEURL}/transaction/movers/packers/cancel`,
    // userQuataion: `${BASEURL}/quotation/approved/get/by/userId`,
    // ratingVandor: `${BASEURL}/rating/add`,
    // generateRecipt: `${BASEURL}/transaction/generate/pdf`,
    // fcmUpdate: `${BASEURL}/user/update/device/token`,
    // searchApi: `${BASEURL}/product/search`,
    // addPWishList: `${BASEURL}/wishlist/product/add`,
    // remPWishlist: `${BASEURL}/wishlist/product/remove`,
    // addVenWishlist: `${BASEURL}/saved/business/add`,
    // remVenWishlist: `${BASEURL}/saved/business/remove`,
    // getwishList: `${BASEURL}/wishlist/get/by/userId`,


}

export const apiMethod = async (config, request, responce) => {

    // const token = await AsyncStorage.getItem("Token");
    const token = await AsyncStorage.getItem('Token');
    let header
    if (token) {
        header = {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + token
        }
    } else {
        header = {
            'Content-Type': 'application/json'
        }
    }
    let body = {
        headers: header,
        data: JSON.stringify(config?.data),
        ...config
    };

    console.log('====================================')
    console.log("bodybodybody", body)
    console.log('====================================')
    return axios(body)
        .then(response => {
            console.log('REGISTER DATA IN SERVICE', response.data);
            let bucketObj = {
                registerData: response.data
            }
            return bucketObj;
        });



}


export const ImageApi = async (imagedata, request, responce) => {

    const token = await AsyncStorage.getItem('Token');

    console.log("tokentokentokentoken", token);

    let Imgdata = new FormData();
    Imgdata.append('image', {
        uri: imagedata?.path,
        name: imagedata?.imageApi,
        type: imagedata?.mime,
    })


    let config = {
        method: 'post',
        url: IMAGEUPLORD,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        },
        data: Imgdata
    };

    return axios.request(config)
        .then(response => {
            console.log('Image data uplord', response.data);
            let bucketObj = {
                image_data: response.data
            }
            return bucketObj;
        });



}


