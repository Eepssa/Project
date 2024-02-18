import React, { useEffect, useState } from "react";

interface Category{
    category:string;
}

const NewsCard = ({ category }:Category) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('https://newsapi.org/v2/top-headlines?q='+category+'&apiKey=1f634d3665534df180889dd88c0953ae')
            .then(response => response.json())
            .then(data => setArticles(data.articles))
            .catch(error => console.error('Error fetching news:', error));
    }, [category]);

    return (
        <div className="container">
            <div className="row">
                {articles.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                        {<img className="card-img-top" src={article.urlToImage} alt="No Image" />}
                            <div className="card-body">
                                <h5 className="card-title">{article.title}</h5>
                                <p className="card-text">{article.description}</p>
                                <a href={article.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsCard;