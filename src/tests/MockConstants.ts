import {Order, WSMessage} from "../types/ApiTypes";
import {FeedState} from "../types/StoreTypes";
import {Ingredient} from "../types/ComponentTypes";

export const mockWSMessage: WSMessage = {
    success: true,
    orders: [
        {
            _id: 'order-id-1',
            ingredients: ['ingredient-1', 'ingredient-2'],
            status: 'done',
            name: 'Test Order 1',
            createdAt: '2023-10-27T10:00:00.000Z',
            updatedAt: '2023-10-27T10:30:00.000Z',
            number: 12345,
        },
        {
            _id: 'order-id-2',
            ingredients: ['ingredient-3'],
            status: 'pending',
            name: 'Test Order 2',
            createdAt: '2023-10-27T11:00:00.000Z',
            updatedAt: '2023-10-27T11:15:00.000Z',
            number: 12346,
        },
    ],
    totalToday: 100,
    total: 5,
};

export const mockOrders: Order[] = [
    {
        _id: 'order-id-3',
        ingredients: ['ingredient-4', 'ingredient-5'],
        status: 'done',
        name: 'Test Order 3',
        createdAt: '2023-10-27T10:00:00.000Z',
        updatedAt: '2023-10-27T10:30:00.000Z',
        number: 5221,
    },
    {
        _id: 'order-id-4',
        ingredients: ['ingredient-6'],
        status: 'pending',
        name: 'Test Order 4',
        createdAt: '2023-10-27T11:00:00.000Z',
        updatedAt: '2023-10-27T11:15:00.000Z',
        number: 1267,
    },
];

export const mockOrderInitialState = {
    orderRequest: true,
    orderSuccess: true,
    order: {name: 'Заказ 1', order: {number: 1}, success: true},
    error: 'Some error'
}

export const initialFeedState: FeedState = {
    orders: [],
    total: 0,
    totalToday: 0,
    wsConnected: false,
    wsConnecting: false,
    error: null,
};

export const mockBun: Ingredient = {
    _id: 'bun-id-1',
    name: 'Test Bun',
    type: 'bun',
    proteins: 10,
    fat: 5,
    carbohydrates: 30,
    calories: 150,
    price: 50,
    image: 'path/to/bun.png',
    image_mobile: 'path/to/bun-mobile.png',
    image_large: 'path/to/bun-large.png',
    __v: 0,
    counter: 0
};

export const mockSauce: Ingredient = {
    _id: 'sauce-id-1',
    name: 'Test Sauce',
    type: 'sauce',
    proteins: 0,
    fat: 0,
    carbohydrates: 2,
    calories: 50,
    price: 70,
    image: 'path/to/sauce.png',
    image_mobile: 'path/to/sauce-mobile.png',
    image_large: 'path/to/sauce-large.png',
    __v: 0,
    counter: 0
};

export const mockMain: Ingredient = {
    _id: 'main-id-1',
    name: 'Test Main',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 10,
    calories: 200,
    price: 100,
    image: 'path/to/main.png',
    image_mobile: 'path/to/main-mobile.png',
    image_large: 'path/to/main-large.png',
    __v: 0,
    counter: 0
};

export const mockMain2: Ingredient = {
    _id: 'main-id-2',
    name: 'Test Main2',
    type: 'main',
    proteins: 20,
    fat: 15,
    carbohydrates: 10,
    calories: 200,
    price: 100,
    image: 'path/to/main.png',
    image_mobile: 'path/to/main-mobile.png',
    image_large: 'path/to/main-large.png',
    __v: 0,
    counter: 0
};

export const mockIngredients: Ingredient[] = [
    mockBun,
    mockMain
];

export const mockOrderResponse = {
    order: {
        name: 'Вкусный бургер',
        order: {
            number: 12345
        },
        success: true
    }
};
