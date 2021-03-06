import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import 'firebase/firestore';

@Injectable()
export class FirestoreService {

  private db: any;

  constructor() {
    this.db = firebase.firestore();
  }

  getDocument(collection: string, docId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docId).get()
        .then((querySnapshot) => resolve(querySnapshot.data()))
        .catch((error: any) => reject(error));
    });
  }

  getDocuments(collection: string, ...where): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = this.db.collection(collection);
      where.forEach(w => query = query.where(...w));
      query.get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            let obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            arr.push(obj);
          });
          if (arr.length > 0) {
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => reject(error));
    });
  }

  deleteDocument(collectionName: string, docID: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).doc(docID).delete()
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  setDocument(collectionName: string, docId: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).doc(docId).set(dataObj)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  addDocument(collectionName: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).add(dataObj)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  updateDocument(collectionName: string, docID: string, dataObj: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collectionName).doc(docID).update(dataObj)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  getSecondDocument(collection: string, docFirstId: string, secondCollection: string, docSecondId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docFirstId).collection(secondCollection).doc(docSecondId).get()
        .then((querySnapshot) => resolve(querySnapshot.data()))
        .catch((error: any) => reject(error));
    });
  }

  getSecondDocuments(collection: string, firstId: string, secondCollection: string, ...where): Promise<any> {
    return new Promise((resolve, reject) => {
      let query = this.db.collection(collection).doc(firstId).collection(secondCollection);
      where.forEach(w => query = query.where(...w));
      query.get()
        .then((querySnapshot) => {
          let arr = [];
          querySnapshot.forEach(function (doc) {
            let obj = JSON.parse(JSON.stringify(doc.data()));
            obj.$key = doc.id;
            arr.push(obj);
          });
          if (arr.length > 0) {
            console.log("Document data:", arr);
            resolve(arr);
          } else {
            console.log("No such document!");
            resolve(null);
          }
        })
        .catch((error: any) => reject(error));
    });
  }

  deleteSecondDocument(collection: string, docID: string, secondCollection: string, secondDocId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docID).collection(secondCollection).doc(secondDocId).delete()
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  addSecondDocument(collection: string, docId: string, secondCollection: string, dataObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docId).collection(secondCollection).add(dataObject)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  setSecondDocument(collection: string, docId: string, secondCollection: string, secondDocId: string, dataObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docId).collection(secondCollection).doc(secondDocId).set(dataObject)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }

  updateSecondDocument(collection: string, docID: string, secondCollection: string, secondDocId: string, dataObject: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.collection(collection).doc(docID).collection(secondCollection).doc(secondDocId).update(dataObject)
        .then((obj: any) => resolve(obj))
        .catch((error: any) => reject(error));
    });
  }
}
