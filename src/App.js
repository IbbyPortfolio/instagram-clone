import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './Utli/firebase';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
   const top = 50;
   const left = 50;

   return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
   };
}

const useStyles = makeStyles((theme) => ({
   paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
   },
}));

function App() {
   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [posts, setPosts] = useState([]);
   const [open, setOpen] = useState(false);
   const [openSignIn, setOpenSignIn] = useState(false);
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [user, setUser] = useState(null);

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
         if (authUser) {
            console.log(authUser);
            setUser(authUser);
         } else {
            setUser(null);
         }

         return () => {
            unsubscribe();
         };
      });
   }, [user, username]);

   useEffect(() => {
      db.collection('posts')
         .orderBy('timestamp', 'desc')
         .onSnapshot((snapshot) => {
            setPosts(
               snapshot.docs.map((doc) => ({
                  id: doc.id,
                  post: doc.data(),
               }))
            );
         });
   }, []);

   const handleClose = () => {
      setOpen(false);
   };

   const handleSignUp = (event) => {
      event.preventDefault();

      auth
         .createUserWithEmailAndPassword(email, password)
         .then((authUser) => {
            return authUser.user.updateProfile({
               displayName: username,
            });
         })
         .catch((error) => alert(error.message));
      setOpen(false);
   };

   const handleSignIn = (event) => {
      event.preventDefault();

      auth

         .signInWithEmailAndPassword(email, password)
         .catch((error) => alert(error.message));

      setOpenSignIn(false);
   };

   return (
      <div className='app'>
         <Modal open={open} onClose={handleClose}>
            <div style={modalStyle} className={classes.paper}>
               <form className='app__signup'>
                  <center>
                     <img
                        className='app__headerImage'
                        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                        alt=''
                     />
                  </center>
                  <Input
                     placeholder='username'
                     type='username'
                     value={username}
                     onChange={(event) => setUsername(event.target.value)}
                  />
                  <Input
                     placeholder='email'
                     type='email'
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
                  <Input
                     placeholder='password'
                     type='password'
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />

                  <Button type='submit' onClick={handleSignUp}>
                     Sign Up
                  </Button>
               </form>
            </div>
         </Modal>
         <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
            <div style={modalStyle} className={classes.paper}>
               <form className='app__signup'>
                  <center>
                     <img
                        className='app__headerImage'
                        src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
                        alt=''
                     />
                  </center>

                  <Input
                     placeholder='email'
                     type='email'
                     value={email}
                     onChange={(event) => setEmail(event.target.value)}
                  />
                  <Input
                     placeholder='password'
                     type='password'
                     value={password}
                     onChange={(event) => setPassword(event.target.value)}
                  />

                  <Button type='submit' onClick={handleSignIn}>
                     Sign In
                  </Button>
               </form>
            </div>
         </Modal>
         <div className='app__header'>
            <img
               className='app__headerImage'
               src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
               alt=''
            />
            {user ? (
               <Button onClick={() => auth.signOut()}>Logout</Button>
            ) : (
               <div className='app__loginContainer'>
                  <Button onClick={() => setOpenSignIn(true)}>Sing In</Button>

                  <Button onClick={(event) => setOpen(true)}>Sign Up</Button>
               </div>
            )}
         </div>
         <div className='app__posts'>
            <div className='app__postsLeft'>
               {posts.map(({ id, post }) => (
                  <Post
                     key={id}
                     postId={id}
                     user={user}
                     username={post.username}
                     caption={post.caption}
                     imageUrl={post.imageUrl}
                  />
               ))}
            </div>
            <div className='app__postsRight'>
               <InstagramEmbed
                  url='https://instagr.am/p/Zw9o4/'
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName='div'
                  protocol=''
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
               />
            </div>
         </div>
         {user && (
            <ImageUpload username={user.displayName} />
         ) }
      </div>
   );
}

export default App;
