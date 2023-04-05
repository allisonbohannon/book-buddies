import React, {useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import CommentCard from '../components/CommentCard';
import { Link } from 'react-router-dom';
import { DetailCard, Button, Container, CardHeader, CardHeading, CardBody, CardButton } from '../styles';
import { Card } from '@mui/material';
import StarRatingShow from '../components/StarRatingShow';
import StarRatingEdit from '../components/StarRatingEdit';
import { UserContext } from '../context/User';


const BookPage = ({books, users, onChangeRating, onAddRating}) => {

  const { bookId } = useParams()
  const {currentUser} = useContext(UserContext)
  const navigate = useNavigate()

  const displayBook = books.find(book => book.id === parseInt(bookId))
  console.log(displayBook)

  // const relatedComments = comments.filter(comment => comment.winery.id === displayWinery.id)

  // let displayComments; 

  // if (relatedComments.length >= 1) {
  //   displayComments = relatedComments.map(comment => {
  //     return (<li key={comment.id} style={{listStyle:"none"}}>
  //         <CommentCard  comment={comment} users={users} wineries={wineries} /> 
  //       </li>)
  //   })     
  // } else {
  //   displayComments = <p>No one has left any comments yet!</p>
  // }
  

  // const userVisit = visits.find(visit => visit.user.id === currentUser)

  const handleClick = () => {
    navigate(-1)
  }

  // const handleAddRating = () => {
  //   const newVisitObj = {
  //       user_id: currentUser.id,
  //       winery_id: displayWinery.id,
  //       rating: 0
  //   }
  //   fetch("/visits", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newVisitObj),
  //   }).then(r => r.json())
  //   .then(data => onAddRating(data))
  // }

  // const handleChangeRating = (newRating) => {
  //   fetch(`/visits/${userVisit.id}`, {
  //     method: "PATCH",
  //     headers: {
  //         "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({rating: newRating}),
  //     }).then(r => r.json())
  //     .then(data => {
  //         onChangeRating(data)
  //         fetch(`/wineries/${displayWinery.id}`)
  //         .then(r => r.json())
  //         .then(data => onUpdateWinery(data))
  //     })

  // }

  const displayAvgRating = () =>  <StarRatingShow rating={displayBook.avgRating}/>
  // const displayUserRating = () => <div>Your Rating: <StarRatingEdit userRating={userVisit.rating} onChange={handleChangeRating} /></div> 
  

  return (
    <Container>
      <Button onClick={handleClick}>Back to Search</Button>
      <br></br>
        <Card variant="outlined">
          <CardHeader style={{justifyContent:"space-around"}}>
              <img src={displayBook.cover_url} alt={displayBook.title} />
              <div style={{width: "40%"}}>
                <CardHeading style={{fontSize:'2em', color:'#aaa', borderBottom: '1px solid #ddd', padding:'1em', }}>{displayBook.title}</CardHeading>
                <CardHeading style={{fontSize:'1.1em', color:'rgb(150,78,108)' }}> Written by: {displayBook.author.join(', ')}</CardHeading>
                <p style={{color:"#aaa", textAlign:"center", margin:"0px"}}>Published: {displayBook.published_date}</p>
                <p style={{color:"#aaa", textAlign:"center", margin:"0px"}}>Pages: {displayBook.pages}</p>
                <p style={{overflow:'none'}}>{displayBook.subject.join(', ')}</p>
                <p>Avg Rating: {displayAvgRating()}  </p>
               { /* 
                  {userVisit? "" : <Button  onClick={handleAddRating}>Add Rating</Button>}
                <p>{userVisit? displayUserRating() : '' }</p> */}
              </div> 
          </CardHeader>
            {/* <CardBody style={{margin:"1em", padding:"3px"}}>
            <p style={{fontSize:'1.1em', color:'rgb(150,78,108)' }}>Comments:</p>
                {displayComments}
            </CardBody> */}
            {/* <CardButton ><Link to={`/books/${displayBook.id}/comments/new`} style={{color:'white', textDecoration:'none'}} >Add Comment</Link></CardButton> */}
        </Card>
    </Container>
  )
}

export default BookPage