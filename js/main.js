const DB_NAME = "FRONT_PWA";
const STORE_NAME = "user_store";
const DB_VERSION = 1;
//store==collect=table
// products
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        var store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject("Error Opening DB");
  });
}

// CRUD->collection=>users

async function addData(data) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(data);
    request.onsuccess = () => res("Data Added");
    request.onerror = () => rej("Error adding data");
  });
}

//  addData({ name: 'ahmed', email: "ahmed@gmail.com" }).then(() => console.log("Data Added")).catch(() => console.log('Error adding data'))

async function getData() {
  const db = await openDB();
  return new Promise((res, rej) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => res(request.result);
    request.onerror = () => rej("Error getting data ");
  });
}

getData()
  .then((data) => console.log("retrived Data :", data))
  .catch((err) => console.log(err));

async function updataData(userId, updatedData) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(userId);

    request.onsuccess = () => {
      const data = request.result;
      if (!data) {
        rej("No user found");
        return;
      }

      let newData = { ...data, ...updatedData };
      const updateRequest = store.put(newData);
      updateRequest.onsuccess = () => res("User updated");
      updateRequest.onerror = () => rej("Error updating user");
    };

    request.onerror = () => rej("Error fetching user");
  });
}

// updataData(30, { name: 'ibrahim sultan', email: 'ibrahimsultan@gamil.com' })

// deleteAll
async function deleteData() {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  const request = store.clear();
  request.onsuccess = () => console.log(`Deleting successfully`);
  request.onerror = () => console.log("Error Deleting data ");
}

// deleteData();
// getData().then((data) => console.log("retrived Data :", data)).catch((err) => console.log(err))
async function deleteSpecificData(userId) {
  const db = await openDB();
  return new Promise((res, rej) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(userId);

    request.onsuccess = () => {
      const data = request.result;
      if (!data) {
        rej("No user found");
        return;
      }

      const deleteRequest = store.delete(userId);
      deleteRequest.onsuccess = () => res("User deleted");
      deleteRequest.onerror = () => rej("Error deleting user");
    };

    request.onerror = () => rej("Error finding user");
  });
}
// deleteSpecificData(21);
// addData({ name: 'ahmeed', email: "ahmeed@gmail.com" }).then(() => console.log("Data Added")).catch(() => console.log('Error adding data'))
// deleteSpecificData(30);
// deleteSpecificData(53);


// for testing all functions in sequence
async function testAll() {
  console.log("Adding user...");
  let userId;
  await addData({ name: "Test1", email: "test1@gmail.com" })
    .then(() => getData())
    .then((data) => {
      console.log("Fetching all users...");
      console.log(data);
      userId = data[0]?.id;
    });

  if (!userId) {
    console.error("id  not found, cannot proceed with update or delete.");
    return;
  }

  console.log("Updating user id " + userId + "...");
  await updataData(userId, { name: "Updated Test1" })
    .then(console.log)
    .catch(console.error);

  console.log("Fetching all users after update...");
  await getData().then(console.log).catch(console.error);

  console.log("Deleting user id " + userId + "...");
  await deleteSpecificData(userId).then(console.log).catch(console.error);

  console.log("Fetching all users after delete...");
  await getData().then(console.log).catch(console.error);

  console.log("Clearing all users...");
  await deleteData();

  console.log("Fetching all users after clear...");
  await getData().then(console.log).catch(console.error);
}

testAll();
