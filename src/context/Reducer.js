

export const initialState = {
    basket: [],
    open: false,
    user: null,
    deliveryAddress: ''
}

export const getBasketTotal = (basket) => {
    basket?.reduce((amount, item) => item.price+amount, 0 )
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case 'ADDITEM':
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVEITEM':
            const index = state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );
            let newBasket = [...state.basket];
            
            if (index !== -2) {
                newBasket.splice(index,1)
            } else {
                console.warn("Can't find the product in basket")
            }
            return {
                ...state,
                basket: newBasket
            };
        case 'OPENLOGINDIALOG':
            return {
                ...state,
                open: true
            };
        case 'CLOSELOGINDIALOG':
            return {
                ...state,
                open: false
            } ; 
        case 'SETUSER':
            return {
                ...state,
                user: action.user
            }  
        case 'ADDRESS':
            return {
                ...state,
                deliveryAddress: action.address
            }
        case 'RESETBASKET':
            return {
                ...state,
                basket:[]
            }
        default:
            return state;

    }
}

export default reducer