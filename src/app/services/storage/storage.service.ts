import {Injectable} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore,} from "@angular/fire/compat/firestore";
import {User} from "../user";


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
}
