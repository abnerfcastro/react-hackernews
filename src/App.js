import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const list = [
    {
        title: 'React',
        url: 'https://facebook.github.io/react',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0
    },
    {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1
    }
]

const isSearched = searchTerm => item => {    
    
    let searchString = '';

    // Include all keys...
    // for (let key in item) { searchString = searchString.concat(String(item[key])); }

    // Destructuring approach
    let { title, author } = item;
    searchString = searchString.concat(title, author);
    
    return searchString.toLowerCase().includes(searchTerm.toLowerCase());
}

class Search extends Component {
    render() {
        const { value, onChange } = this.props;
        return (
            <form>
                <input
                    className="Search__field"
                    type="text"
                    placeholder="Search..."
                    value={value}
                    onChange={onChange}
                />
            </form>
        )
    }
}

class Cards extends Component {
    render() {
        const { list, pattern, onDismiss } = this.props;        
        return (
            <div>
                {list
                    .filter(isSearched(pattern))
                    .map(item =>
                        <Card
                            item={item}
                            onDismiss={onDismiss}
                        />
                )}
            </div>
        )
    }
}

class Card extends Component {
    render() {
        const { item, onDismiss } = this.props;        
        return (
            <div key={item.objectID} className="Card">                        
                <a
                    href="javascript:void(0)"
                    className="Card__dismiss"
                    onClick={() => onDismiss(item.objectID)}
                >&times;</a>
                <h1>
                    <a href={item.url}>{item.title}</a>
                </h1>
                <h2>{item.author}</h2>
                <span>{item.num_comments} comments, {item.points} points</span>
            </div>
        )
    }
}

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = { list, searchTerm: '', };

        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    onDismiss(id) {
        const updatedList = this.state.list.filter(item => item.objectID !== id);        
        this.setState({ list: updatedList });
    }

    onSearchChange(event) {
        this.setState({ searchTerm: event.target.value });
    }

    render() {
        const { list, searchTerm } = this.state;
        return (
            <div className="App">
                <Search
                    value={searchTerm}
                    onChange={this.onSearchChange}
                />
                <Cards
                    list={list}
                    pattern={searchTerm}
                    onDismiss={this.onDismiss}
                />
            </div>
        );
    }
}

export default App;
