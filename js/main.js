const DB_NAME = "FRONT_PWA";
const STORE_NAME = "user_store";
const DB_VERSION = 1;
//store==collect=table
// products
function openDB() {
  return new Promise((resolve, reject) => {
    const requset = indexedDB.open(DB_NAME, DB_VERSION);

    requset.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        var store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    requset.onsuccess = () => resolve(requset.result);
    requset.onerror = () => reject("Error Opening DB");
  });
}

// CRUD->collection=>users

async function addData(data) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.add(data);
  return transaction.result;
}

//  addData({ name: 'hanan', email: "hanan@gmail.com" }).then(() => console.log("Data Added")).catch(() => console.log('Error adding data'))

async function getData() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const requset = store.getAll()

    requset.onsuccess = () => res(requset.result)
    requset.onerror = () => rej('Error getting data ')

  })
}

getData().then((data) => console.log("retrived Data :", data)).catch((err) => console.log(err))


async function updataData(userId, updatedData) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(userId)
  request.onsuccess = () => {
    const data = request.result

    if (!data) {
      console.log('No User with this id');
      return
    }
    let newData = { ...data, ...updatedData }
    store.put(newData)

  }


}
// updataData(30, { name: 'osama mohamed', email: 'osama@gamil.com' })

// deleteAll
async function deleteData() {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const requset = store.clear();
  requset.onsuccess = () => console.log
    (`Deleting successfully`);
  requset.onerror = () => console.log
    ('Error Deleting data ');


}

// deleteData();
// getData().then((data) => console.log("retrived Data :", data)).catch((err) => console.log(err))
async function deleteSpecificData(userId) {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.get(userId);
  request.onsuccess = () => {
    const data = request.result
   
    if (!data) {
      console.log('No User with this id');
      return
    }

  const user = store.delete(userId)
    user.onsuccess = () => console.log('delete user with id ', userId);
    user.onerror = () => console.log('error deleting that user');
  }


}
// deleteSpecificData(21);
// addData({ name: 'hanaa', email: "hanaa@gmail.com" }).then(() => console.log("Data Added")).catch(() => console.log('Error adding data'))
// deleteSpecificData(30);
// deleteSpecificData(53);