import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore, AngularFirestoreDocument,} from "@angular/fire/compat/firestore";
import {User} from "../user";
import {Post} from "../post";


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

  getAllProfiles() : User[] {
    const userList : User[] = [];
    const querySnapshot = this.afStore.collection(`users`).get();
    querySnapshot.forEach((collection) => {
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
    };

    postRef.set(postData, {
      merge: true,
    });
    const postId = postRef.ref.id;
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
}
