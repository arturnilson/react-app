import React, { Component } from 'react';
import './App.css';

import ProductItem from './ProductItem';
import AddProduct from './AddProduct';

const products = [
  {
    id: 1,
    name: 'iPad',
    price: 2500
  },
  {
    id: 2,
    name: 'iPhone',
    price: 4000
  }
]


localStorage.setItem('products', JSON.stringify(products))

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: JSON.parse(localStorage.getItem('products'))
    }

    this.onDelete = this.onDelete.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onEditSubmit = this.onEditSubmit.bind(this)
  }

  componentWillMount() {
    const products = this.getProducts();

    this.setState({ products })
  }

  getProducts() {
    return this.state.products

  }

  onDelete(id) {
    const products = this.getProducts();

    const filteredProducts = products.filter(product => {
      return product.id !== id
    })

    this.setState({ products: filteredProducts })
  }


  onAdd(name, price) {
    const products = this.getProducts()

    products.push({
      name,
      price
    })

    this.setState({ products })
  }

  onEditSubmit(name, price, id) {
    let products = this.getProducts()

    products = products.map(product => {
      if (product.id === id) {
        product.name = name
        product.price = price
      }

      return product
    })

    this.setState({ products })
  }

  render() {
    return (
      <div className="App">
        <h1>Product Manager</h1>

        <AddProduct
          onAdd={this.onAdd}
        />

        {
          this.state.products.map(product => {
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                onDelete={this.onDelete}
                onEditSubmit={this.onEditSubmit}
              />
            )
          })
        }
      </div>
    )
  }
}

export default App;