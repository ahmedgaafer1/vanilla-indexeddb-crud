# Vanilla IndexedDB CRUD

A minimal, framework-free JavaScript implementation for handling CRUD operations (Create, Read, Update, Delete) using IndexedDB.  
Perfect for learning, testing, or integrating local storage logic in modern web projects.

---

## 🚀 Features

- **Pure Vanilla JS:** No dependencies, no frameworks.
- **User Store:** Simple structure with auto-incremented user IDs.
- **CRUD Operations:** Add, fetch, update, and delete users.
- **Promise-Based:** Clean async/await support for all methods.
- **Easy to Integrate:** Just drop the file and start using!

---

## 📦 Usage

1. **Include the script** in your HTML file:

   ```html
   <script src="main.js"></script>
   ```

2. **Interact via Browser Console:**  
   Example operations:

   ```js
   // Add a user
   addData({ name: "Ali", email: "ali@gmail.com" }).then(console.log);

   // Fetch all users
   getData().then(console.log);

   // Update a user (replace 1 with a real user id)
   updataData(1, { name: "Updated Name" }).then(console.log);

   // Delete a user (replace 1 with a real user id)
   deleteSpecificData(1).then(console.log);

   // Delete all users
   deleteData();
   ```

3. **Test everything at once:**  
   Paste this after loading `main.js`:

   ```js
   async function testAll() {
     let userId;
     await addData({ name: "Test1", email: "test1@gmail.com" })
       .then(() => getData())
       .then((data) => {
         console.log("Fetching all users...");
         console.log(data);
         userId = data[0]?.id;
       });

     if (!userId) {
       console.error("No id found for test user!");
       return;
     }

     console.log("Updating user id " + userId + "...");
     await updataData(userId, { name: "Updated Test1" }).then(console.log);

     console.log("Fetching all users after update...");
     await getData().then(console.log);

     console.log("Deleting user id " + userId + "...");
     await deleteSpecificData(userId).then(console.log);

     console.log("Fetching all users after delete...");
     await getData().then(console.log);

     console.log("Clearing all users...");
     await deleteData();

     console.log("Fetching all users after clear...");
     await getData().then(console.log);
   }
   testAll();
   ```

---

## 📝 Notes

- All logic is in `main.js`.
- No UI – for educational/demo/local development use.
- Can be easily extended to support more complex data or UI integration.

---

## 📄 License

MIT

---

> Made with 💻 by [Ahmed Gaafer](https://github.com/ahmedgaafer1)
