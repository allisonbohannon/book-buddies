import React, { useState } from 'react'
import { Container, FormField, Input, CardButton, Error } from '../styles'


const Books = () => {

    const [searchTerm, setSearchTerm] = useState()
    const [searchType, setSearchType] = useState()
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);


    function parsedSearchType(searchType) {
        let parsedType; 
        switch(searchType) {
            case 'author': 
                parsedType = 'author';
                break;
            case 'title': 
                parsedType = 'title';
                break;
            default: 
                parsedType = 'q';
                break;
        }
        return parsedType;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const parsedSearch = `${parsedSearchType(searchType)}=${searchTerm.split(' ').join('+')}`
        fetch(`https://openlibrary.org/search.json?${parsedSearch}`)
        .then(r => r.json())
        .then(data => console.log(data))
    }

  return (
    <Container>
        <form onSubmit={handleSubmit}>
            <FormField>
                <Input
                type="text"
                id="searchTerm"
                autoComplete="off"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                >
                </Input>
            </FormField>
            <FormField>
                <select 
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    >
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="genre">Genre</option>
                </select>
            </FormField>
            <FormField>
                <CardButton variant="fill" color="primary" type="submit">
                    {isLoading ? "Loading..." : "Search"}
                </CardButton>
            </FormField>
            <FormField>
                {error? <Error>{error}</Error> : "" }
            </FormField>
        </form>
       
    </Container>
  )
}

export default Books