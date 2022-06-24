import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreDocument,} from "@angular/fire/compat/firestore";
import {User} from "../user";
import {Post} from "../post";
import {comment} from "../comment";
import {collection} from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private afStorage : AngularFireStorage, private afStore:AngularFirestore) {}

  uploadProfilePicture(img:File) {
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const storageRef = this.afStorage.storage.ref();
    const path = `/users/${user.uid}`;
    const imgRef = storageRef.child(path);
    if (user.uid) {
      const uploadTask = imgRef.put(img);
      uploadTask.then(snapshot => snapshot.ref.getDownloadURL().then(downloadURL => {
        this.afStore.collection(`users`).doc(user.uid).update({photoURL: downloadURL}).catch(err => console.log(err.message));
      }))
    }
  }

  addFriend(friendUid: string){
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const friendRef: AngularFirestoreDocument<any> = this.afStore.collection(`users`).doc(user.uid)
        .collection(`friends`).doc(friendUid);
    return friendRef.set({uid:friendUid}, {merge:true});

  }

  async getAllProfiles() {
    let userList : User[] = [];
    const querySnapshot = this.afStore.collection(`users`).get();
    await querySnapshot.forEach((collection) => {
      collection.docs.forEach((user)=>{
          const userItem : User = user.data() as User;
          userList.push(userItem);
          //console.log(userItem);
          })
    })
    return userList;
  }



  uploadPost(text: string,img:File) {
    const postRef: AngularFirestoreDocument<any> = this.afStore.collection(`posts`).doc();
    // @ts-ignore
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const postData: Post = {
      text: text,
      photoURL: "",
      uid: user.uid,
      postId: ''
    };

    const postId = postRef.ref.id;
    postRef.set(postData, {
      merge: true,
    }).then( () => {
      postRef.update({
        postId: postId
      });
    });

    const storageRef = this.afStorage.storage.ref();
    const path = `/posts/${postId}`;
    const imgRef = storageRef.child(path);
    if (postId) {
      const uploadTask = imgRef.put(img,{contentType:'image/jpeg'});
      uploadTask.then(snapshot => snapshot.ref.getDownloadURL().then(downloadURL => {
        this.afStore.collection(`posts`).doc(postId).update({photoURL: downloadURL}).catch(err => console.log(err.message));
      }))
    }
  }

  async getAllPosts(){
    let postList: Post[]=[];
    const querySnapshot = this.afStore.collection(`posts`).get();
    await querySnapshot.forEach((collection) => {
      collection.docs.forEach((post)=>{
        const postItem : Post = post.data() as Post;
        postList.push(postItem);
      })
    });
    return postList;
  }

  getUserWithUID(uid:string){
    return this.afStore.collection(`users`).doc(uid).get();
  }

  updateUserData(userData, uid){ //not using User type as some part might not be updated
    const postRef = this.afStore.collection('users').doc(uid);
    return postRef.update(userData)
  }

  deleteFriend(friendUid:string){
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const friendRef: AngularFirestoreDocument<any> = this.afStore.collection(`users`).doc(user.uid)
        .collection(`friends`).doc(friendUid);
    return friendRef.delete();
  }


  async getFriendsList(){
    let friendsList : User[] = [];
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const querySnapshot = this.afStore.collection(`users`).doc(user.uid)
        .collection(`friends`).get();
    await querySnapshot.forEach((collection) => {
      collection.docs.forEach((friend)=>{
        const friendItem : User = friend.data() as User;
        friendsList.push(friendItem);
      })
    });
    return friendsList;
  }

  async getFriendsListForFriendsDisplay(){
    let friendsUidList : string[] = [];
    let friendsList : User[] = [];
    const user: User = JSON.parse(localStorage.getItem(`user`));
    const querySnapshot = this.afStore.collection(`users`).doc(user.uid)
        .collection(`friends`).get();
    await querySnapshot.forEach((collection) => {
      collection.docs.forEach((friend)=>{
        const friendItem : User = friend.data() as User;
        friendsUidList.push(friendItem.uid);
      })
    });
    friendsUidList.forEach(uid =>{
      this.getUserWithUID(uid).subscribe(user =>{
        if(user!=undefined) {
          friendsList.push(user.data() as User)
          console.log(user.data());
        }
      })
    })
    return friendsList;
  }


  async getCommentsList(postId : string){
    let commentsList : comment[] = [];
    const querySnapshot = this.afStore.collection(`posts`).doc(postId)
      .collection(`comments`).get();
    await querySnapshot.forEach((collection) => {
      collection.docs.forEach((comment) => {
        const commentData: comment = comment.data() as comment;
        commentsList.push(commentData);
      })
    });
    return commentsList;
  }



}
