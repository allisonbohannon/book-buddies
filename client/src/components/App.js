import { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Home from "../pages/Home";
import Wineries from "../pages/Wineries";
import Users from "../pages/Users";
import WineryDetail from "../pages/WineryDetail";
import EditCommentForm from "../pages/EditCommentForm";
import ShowCommentForm from "../pages/ShowCommentForm";
import AddCommentForm from "../pages/AddCommentForm";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Maps from "../pages/Maps";
import { UserContext } from "../context/User";


function App() {

  const { currentUser, setCurrentUser} =useContext(UserContext)
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])

// Check sessions to see whether a user is logged in
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } 
    });
  }, []);


  //Set initial states

  useEffect(() => {
    fetch(`/books`)
    .then(r => r.json())
    .then(data => setBooks(data))

    fetch(`/users`)
    .then(r => r.json())
    .then(data => setUsers(data))

  }, [])

  const onAddComment = (comment) => {
    // setComments([...comments, comment])
  }

  const onEditComment = (updatedComment) => {
    // setComments((comments)=> 
    //   comments.map((comment)=> {
    //     return comment.id === updatedComment.id ? updatedComment : comment
    // })
  // )
}

  const onDeleteComment = (deletedComment) => {
    // setComments((comments) => 
    //   comments.filter((comment) => comment.id !== deletedComment.id)
  // )
}

  const onAddUser = (userObject) => {
    setUsers([...users, userObject])
  }

  const onChangeRating = (updatedVisit) => {
  //   setVisits((visits) => 
  //     visits.map((visit) => {
  //       return visit.id === updatedVisit.id ? updatedVisit : visit;
  //     })
  // )
} 

  const onAddRating = (newVisit) => {
    // setVisits([...visits, newVisit])
  }

  // const onUpdateWinery = (updatedWinery) => {
  //   setWineries((wineries) => 
  //     wineries.map((winery) => {
  //       return winery.id === updatedWinery.id ? updatedWinery : winery; 
  //     })
  // )}

  //ensure user login prior to showing page

  if (!currentUser) return (
    <div>
      <Routes>
        <Route path="/" element={<Login
                />} />
        <Route path="/signup" element={<SignUp
                  onAddUser={onAddUser}
                />} />
      </Routes>
    </div>
    ); 

  return (
    <div>
            <NavigationBar />
            <Routes>
                <Route path="/books" element={<Wineries
                  books={books}
                  onChangeRating={onChangeRating}
                  onAddRating={onAddRating}
                />}/> 
                <Route path="/books/:bookId" element={<WineryDetail
                  books={books}
                  users={users}
                  onChangeRating={onChangeRating}
                  onAddRating={onAddRating}
                />}/>
                 <Route path="/books/:bookId/bookclubs/:bookclubId" element={<EditCommentForm
                  books={books}
                  users={users}
                 
                />}/>
                 <Route path="/bookclub/:bookclubId/messages/new" element={<AddCommentForm
                   books={books}
                   users={users}
                   onAddComment={onAddComment}
                />}/>
                   <Route path="/bookclub/:bookclubId/messages/:messageId/edit" element={<AddCommentForm
                   books={books}
                   users={users}
                   onEditComment={onEditComment}
                   onDeleteComment={onDeleteComment}
                />}/>
                <Route path="/users" element={<Users
                  users={users}
                />} />
                <Route path="/users/:id" element={<Users
                   users={users}
                />} />
                <Route path="/" element={<Home
                />} />
               
            </Routes>
        </div>
  );
}

export default App;
