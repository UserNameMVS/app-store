import { groupsObject as groups } from './groups.api'

const products = [
  {
    _id: 'a000001',
    name: 'Apple iPhone 13 Pro Max',
    group: groups.iphone,
    price: 109990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/dca/170_170_1/dca32fccc72f91b8de65872ab65d7ed7.jpg',
    count: 50
  },
  {
    _id: 'a000002',
    name: 'Apple iPhone 11',
    group: groups.iphone,
    price: 64990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/3ad/1160_880_17f5c944b3b71591cc9304fac25365de2/3ad09f1ec4a94498118c24ca8e9f3b4a.jpg',

    count: 55
  },
  {
    _id: 'a000003',
    name: 'Apple iPhone 10',
    group: groups.iphone,
    price: 79990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/7cd/1160_880_17f5c944b3b71591cc9304fac25365de2/7cd7910f2a5302ab559b5ce94e398125.jpg',
    count: 60
  },
  {
    _id: 'a000004',
    name: 'Apple iPhone SE',
    group: groups.iphone,
    price: 51990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/5fd/1160_880_17f5c944b3b71591cc9304fac25365de2/5fd51b9fe517cac135c92dd031cd5bc0.jpg',
    count: 10
  },
  {
    _id: 'a000005',
    name: 'Apple MacBook Pro 13"',
    group: groups.makbook,
    price: 137990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/922/1160_880_17f5c944b3b71591cc9304fac25365de2/92296847433225e3be0db5e827c7682e.jpg',
    count: 15
  },
  {
    _id: 'a000006',
    name: 'Apple MacBook Air',
    group: groups.makbook,
    price: 119990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/de3/1160_880_17f5c944b3b71591cc9304fac25365de2/de317158d7bc97f494dab6698a95b12a.jpg',
    count: 25
  },
  {
    _id: 'a000007',
    name: 'Apple MacBook Pro 16"',
    group: groups.makbook,
    price: 254990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/b15/1160_880_17f5c944b3b71591cc9304fac25365de2/b150ea3967babb753a28d196757b428a.jpg',
    count: 30
  },
  {
    _id: 'a000008',
    name: 'Apple iMac 24" Blue',
    group: groups.imak,
    price: 169990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/b75/867_729_17f5c944b3b71591cc9304fac25365de2/b75b653416606202eff585c671cf0d13.jpg',
    count: 40
  },
  {
    _id: 'a000009',
    name: 'Apple iMac 24" Gold',
    group: groups.imak,
    price: 149990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/311/866_729_17f5c944b3b71591cc9304fac25365de2/31130a4b20d0a383eeb842e7b1f22bd5.jpg',
    count: 5
  },
  {
    _id: 'a000010',
    name: 'Apple Mac Pro',
    group: groups.makpro,
    price: 621990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/a02/1160_880_17f5c944b3b71591cc9304fac25365de2/a02a78fe5fb38035a3ccdbabdf722f12.jpg',
    count: 100
  },
  {
    _id: 'a0000011',
    name: 'Apple Watch Series 6',
    group: groups.applewatch,
    price: 36990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/e1a/1160_880_17f5c944b3b71591cc9304fac25365de2/e1a220f521cd232b62e6c357be9f1801.jpg',
    count: 300
  },
  {
    _id: 'a0000012',
    name: 'Apple Watch Nike Series 6',
    group: groups.applewatch,
    price: 37990,
    image:
      'https://static.re-store.ru/upload/resize_cache/iblock/c03/1160_880_17f5c944b3b71591cc9304fac25365de2/c034d55e79704a2c8b0cc90049c1a8b7.jpg',
    count: 500
  }
]

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify(products))
}

const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('products')))
    }, 1000)
  })

const update = (id, data) =>
  new Promise((resolve) => {
    const products = JSON.parse(localStorage.getItem('products'))
    const productIndex = products.findIndex((p) => p._id === id)
    products[productIndex] = { ...products[productIndex], ...data }
    localStorage.setItem('products', JSON.stringify(products))
    resolve(products[productIndex])
  })

const getById = (id) =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('products')).find((p) => p._id === id))
    }, 500)
  })

export default {
  fetchAll,
  getById,
  update
}