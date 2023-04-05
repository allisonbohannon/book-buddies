import React from 'react'
import {useNavigate} from 'react-router-dom'
import { CardBody, CardHeader, CardHeading } from '../styles'
import {Card, CardActionArea} from '@mui/material'

const ResultCard = ({result, onAddBook}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        const bookObj = {
            title: result.title, 
            author: author,
            published_date: result.first_publish_year,
            subject: subject,
            pages: result.number_of_pages_median,
            cover_url: url,
            isbn: isbn
        }

        console.log(bookObj)
        //On the backend, user find_or_create_by isbn to add to DB
        fetch("/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookObj),
            }).then(r => {
                if (!r.ok) {
                    console.log("Hmmm...something went wrong")

                } else if (r.status === 201) {
                    r.json().then(data => {
                        onAddBook(data)
                        navigate(`/books/${data.id}`)
                    })
                } else {
                    r.json().then(data => navigate(`/books/${data.id}`))
                }
            })
        }
          

    let isbn; 
    if (!result.isbn) {
        isbn = 0
    } else if (result.isbn.length > 0 ) {
        isbn = result.isbn[0]
    } else {
        isbn = result.isbn
    }

    const author = []; 
    if (!result.author_name) {
        author.push("Unknown")
    } else {
        result.author_name.forEach(name => author.push(name))
    }

    const subject = []; 
    if (!result.subject) {
        subject.push(" ")
    } else {
        for (let i = 0; i < 3; i++) {
            subject.push(result.subject[i])
        }
    }

    const url = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`


  return (
    <CardActionArea onClick={handleClick}>
        <Card variant='outlined'>
            <img src={url} style={{display:"inline-block"}} />
            <CardHeader>
                <CardHeading>{result.title}</CardHeading>
            </CardHeader>
            <CardBody>
                <p>Written By: {result.author_name.join(', ')}</p>
                <p>Published {result.first_publish_year}</p>
                <p>Genres: {subject.join(', ')}</p>
            </CardBody>
        </Card>
    </CardActionArea>
    
  )
}

export default ResultCard