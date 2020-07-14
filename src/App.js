import React, { Component } from 'react';
import './App.css';
import ProductItem from './ProductItem';

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

  render() {
    return (
      <div className="App">
        <h1>Produtos</h1>
        {
          this.state.products.map(product => {
            console.log(product)
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                onDelete={this.onDelete}
              />
            )
          })
        }
      </div>
    )
  }
}

export default App;