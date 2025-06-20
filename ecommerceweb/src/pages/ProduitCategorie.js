import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import NavBar from '../components/NavBar';
import './ProduitCategorie.css';


function ProduitCategorie({ id, setPage, setId, setSelectedCategory }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((res) => {
            const filtered = res.data.filter(
                (product) => product.categorie === id
            );
            setProducts(filtered);
            })
            .catch((err) => console.error(err));
        }, [id]);


    const handleProductClick = (productId) => {
        setId(productId);
        console.log(productId);
        setPage('produit');
    };

    return (
        <div>
            <NavBar setPage={setPage} setId={setId} />

            <div className="produit-categorie-container">
                <h1>Products in category: {id}</h1>
                <ul className="product-list">
                    {products.map((product) => (
                        <li
                            key={product.id}
                            className="product-item"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <p>{product.nom}</p>
                            <img src={product.image} alt={product.nom} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProduitCategorie;
