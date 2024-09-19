import { Injectable } from '@angular/core';
import { getFirestore } from 'firebase/firestore';
import { collection, addDoc, getDocs, doc, getDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { Snippets } from '../../models/snippet';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db?: any
  constructor(private authservice: AuthService, private router:Router) {
    this.db = getFirestore()
  }

  async createSnippet(snippet: Snippets) {
    try {
      const docRef = await addDoc(collection(this.db, "snippets"), {
        ...snippet,
        by: this.authservice.getUid()
      });
      console.log("Document written with Id:", docRef.id);
      this.router.navigate(["/"])
    } catch (e) {
      console.error("error Adding document", e)
      alert("error while creating")
    }
  }

  async getAllSnippet() {
    let result: any[] = [];
    const quearySnapshot = await getDocs(collection(this.db, "snippets"));
    quearySnapshot.forEach((doc) => {
      // console.log(`${doc.id}=> ${doc.data()}`)
      result.push({ id: doc.id, ...doc.data() })
    });
    return result
  }

  async getSnippetById(docId:string) {

    const docRef = doc(this.db, "snippets", docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data :", docSnap.data());
      return docSnap.data();
    } else {
      // console.log("No Such Document !");
      return {
        id: "1",
        title: "not found",
        code: "not found"
      }
    }
  }


}
