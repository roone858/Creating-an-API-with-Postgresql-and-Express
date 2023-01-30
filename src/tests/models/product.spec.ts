import { ProductStore } from '../../models/products'

const store = new ProductStore()

describe('Product Model', () => {
  it('should create a product', async () => {
    const result = await store.create({
      productid: 1,
      title: 'Test product',
      price: 40.25,

    })
    expect(result).toEqual({
      productid: 1,
      title: 'Test product',
      price: 40.25,
    })
  })



  it('should return a list of products', async () => {
    const result = await store.index()
    expect(result).toEqual([
      {
        id: 1,
        name: 'Test product 2',
        price: '50.25',

      },
    ])
  })

  it('should return the correct product', async () => {
    const result = await store.show("1")
    expect(result).toEqual({
      id: 1,
      name: 'Test product 2',
      price: '50.25',

    })
  })

  it('should delete the product', async () => {
    await store.deleteP("1")
    const result = await store.index()

    expect(result).toEqual([])
  })
})