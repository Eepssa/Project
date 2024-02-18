import { useEffect, useState } from 'react';

const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("https://newsapi.org/v2/top-headlines?q=india&apiKey=594a2f1138c040a3afb244f989e56273")
            .then(response => response.json())
            .then(data => setArticles(data.articles));
    }, []);

    return (
        <div className="container">
            <div className="row">
                {articles.map((article, index) => (
                    <div key={index} className="col-md-4 mb-4">
                        <div className="card">
                            {<img className="card-img-top" src={article.urlToImage} alt="Article" />}
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
}

export default News;