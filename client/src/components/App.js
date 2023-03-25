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
  const [wineries, setWineries] = useState([])
  const [users, setUsers] = useState([])
  const [visits, setVisits] = useState([])
  const [comments, setComments] = useState([])
  const { currentUser, setCurrentUser} =useContext(UserContext)


  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      } 
    });
  }, []);

  useEffect(() => {
    fetch(`/wineries`)
    .then(r => r.json())
    .then(data => setWineries(data))

    fetch(`/users`)
    .then(r => r.json())
    .then(data => setUsers(data))

    fetch(`/visits`)
    .then(r => r.json())
    .then(data => setVisits(data))

    fetch(`/comments`)
    .then(r => r.json())
    .then(data => setComments(data))
  }, [])

  const onAddComment = (comment) => {
    setComments([...comments, comment])
  }

  const onEditComment = (updatedComment) => {
    setComments((comments)=> 
      comments.map((comment)=> {
        return comment.id === updatedComment.id ? updatedComment : comment
    })
  )}

  const onDeleteComment = (deletedComment) => {
    setComments((comments) => 
      comments.filter((comment) => comment.id !== deletedComment.id)
  )}

  const onAddUser = (userObject) => {
    setUsers([...users, userObject])
  }

  const onChangeRating = (updatedVisit) => {
    setVisits((visits) => 
      visits.map((visit) => {
        return visit.id === updatedVisit.id ? updatedVisit : visit;
      })
  )} 

  const onAddRating = (newVisit) => {
    setVisits([...visits, newVisit])
  }

  const onUpdateWinery = (updatedWinery) => {
    setWineries((wineries) => 
      wineries.map((winery) => {
        return winery.id === updatedWinery.id ? updatedWinery : winery; 
      })
  )}

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
                <Route path="/wineries" element={<Wineries
                  wineries={wineries}
                  visits={visits}
                  comments={comments}
                  onChangeRating={onChangeRating}
                  onAddRating={onAddRating}
                  onUpdateWinery={onUpdateWinery}
                />}/> 
                <Route path="/wineries/:wineryId" element={<WineryDetail
                  wineries={wineries}
                  visits={visits}
                  users={users}
                  comments={comments}
                  onChangeRating={onChangeRating}
                  onAddRating={onAddRating}
                  onUpdateWinery={onUpdateWinery}
                />}/>
                 <Route path="/wineries/:wineryId/comments/:commentId/edit" element={<EditCommentForm
                  wineries={wineries}
                  comments={comments}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                />}/>
                 <Route path="/wineries/:wineryId/comments/new" element={<AddCommentForm
                  wineries={wineries}
                  users={users}
                  onAddComment={onAddComment}
                />}/>
                 <Route path="/wineries/:wineryId/comments/:commentId" element={<ShowCommentForm
                  wineries={wineries}
                  visits={visits}
                  comments={comments}
                />}/>
                <Route path="/users" element={<Users
                  users={users}
                  visits={visits}
                  comments={comments}
                />} />
                <Route path="/users/:id" element={<Users
                  users={users}
                  visits={visits}
                  comments={comments}
                />} />
                 <Route path="/maps" element={<Maps 
                 />} />
                <Route path="/" element={<Home
                />} />
               
            </Routes>
        </div>
  );
}

export default App;
