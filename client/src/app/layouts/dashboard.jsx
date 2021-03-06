import { orderBy } from 'lodash'
import React, { useState } from 'react'
import Container from '../components/common/container'
import CreateForm from '../components/ui/createForm'
import TableItems from '../components/common/table'
import EditForm from '../components/ui/editForm'
import Group from '../components/ui/group'
import Thumbnail from '../components/ui/thumbnail'
import Loader from '../components/common/loader'
import { useDispatch, useSelector } from 'react-redux'
import { getGroupsLoadingStatus } from '../store/groups'
import { deleteProduct, getProductsList, getProductsLoadingStatus } from '../store/products'
import useToggle from '../hooks/useToggle'

const Dashboard = () => {
  const dispatch = useDispatch()
  const isLoadingProducts = useSelector(getProductsLoadingStatus())
  const products = useSelector(getProductsList())
  const isLoadingGroups = useSelector(getGroupsLoadingStatus())
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
  const [typeForm, setTypeForm] = useState()
  const [id, setId] = useState()
  const [show, setShow] = useToggle(false)

  const columns = {
    id: { path: '_id', name: 'ID' },
    name: { path: 'name', name: 'Наименование' },
    group: {
      path: 'group',
      name: 'Категория',
      component: (product) => <Group id={product.group} />
    },
    price: { path: 'price', name: 'Стоимость' },
    count: { path: 'count', name: 'Кол-во' },
    image: { name: 'Фото', component: (product) => <Thumbnail id={product._id} /> },
    buttons: {
      component: (item) => (
        <div className="d-flex">
          <button className="btn btn-primary" onClick={() => handleProductEdit(item._id)}>
            <i className="bi bi-pencil"></i>
          </button>
          <button className="btn btn-danger ms-1" onClick={() => handleDelete(item._id)}>
            <i className="bi bi-trash"></i>
          </button>
        </div>
      )
    }
  }

  const handleClose = () => {
    setShow(false)
    setTypeForm()
  }

  const handleProductEdit = (id) => {
    setId(id)
    setTypeForm('edit')
    setShow(true)
  }
  const handleProductCreate = () => {
    setTypeForm('create')
    setShow(true)
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  const handleSort = (item) => {
    setSortBy(item)
  }

  const sortedProducts = orderBy(products, [sortBy.path], [sortBy.order])

  if (isLoadingProducts || isLoadingGroups) return <Loader />

  return (
    <main>
      <Container>
        <>
          <button className="btn btn-primary d-flex ms-auto" onClick={handleProductCreate}>
            Добавить
          </button>
          <TableItems
            columns={columns}
            data={sortedProducts}
            selectedSort={sortBy}
            onSort={handleSort}
          />
          {typeForm && (
            <>
              {typeForm === 'edit' ? (
                <EditForm id={id} onClose={handleClose} show={show} />
              ) : (
                <CreateForm onClose={handleClose} show={show} />
              )}
            </>
          )}
        </>
      </Container>
    </main>
  )
}

export default Dashboard
