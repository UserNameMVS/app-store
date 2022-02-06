import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Container from '../components/common/container'
import Loader from '../components/common/loader'
import BasketCard from '../components/ui/basketCard'
import { getProductsList } from '../store/products'
import { getUser, getUserLoadingStatus, updateUser } from '../store/user'

const Basket = () => {
  const dispatch = useDispatch()
  const products = useSelector(getProductsList())
  const isLoadingUser = useSelector(getUserLoadingStatus())
  const [basket, setBasket] = useState([])
  const [amount, setAmount] = useState(0)
  const user = useSelector(getUser())

  useEffect(() => {
    if (!isLoadingUser) {
      setBasket(user.basket)
    }
  }, [user])

  useEffect(() => {
    setAmount(getSum())
  }, [basket])

  const handleDelete = (productId) => {
    const newBasket = user.basket.filter((b) => b._id !== productId)
    const userWithChangedBasket = { ...user, basket: newBasket }
    dispatch(updateUser(userWithChangedBasket))
  }

  function getSum() {
    if (basket) {
      const productsList = []
      for (const b of basket) {
        for (const p of products) {
          if (b._id === p._id) {
            productsList.push(p.price * b.count)
            break
          }
        }
      }
      return productsList.reduce((a, b) => a + b, 0)
    }
  }

  const handleIncrement = (productId) => {
    const newBasket = [...basket]
    const index = basket.findIndex((p) => p._id === productId)
    newBasket[index] = { ...newBasket[index], count: newBasket[index].count + 1 }
    const userWithChangedBasket = { ...user, basket: newBasket }
    dispatch(updateUser(userWithChangedBasket))
  }

  const handleDecrement = (productId) => {
    const newBasket = [...basket]
    const index = basket.findIndex((p) => p._id === productId)
    newBasket[index] = { ...newBasket[index], count: newBasket[index].count - 1 }
    const userWithChangedBasket = { ...user, basket: newBasket }
    dispatch(updateUser(userWithChangedBasket))
  }

  if (isLoadingUser) return <Loader />

  return (
    <main>
      <Container>
        <div className="row d-flex">
          <div className="col-md-9 col-sm flex-grow-1 position-relative">
            {basket && basket.length > 0 ? (
              <>
                {basket.map((item) => (
                  <BasketCard
                    key={item._id}
                    productId={item._id}
                    count={item.count}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                    onDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <h1 className="text-center">Корзина пуста</h1>
            )}
          </div>
          <div className="col-md-3 col-sm mb-4">
            <p className="card-text">
              {<b>Итого: {new Intl.NumberFormat('ru-RU').format(amount)} ₽</b>}
            </p>
          </div>
        </div>
      </Container>
    </main>
  )
}

export default Basket
