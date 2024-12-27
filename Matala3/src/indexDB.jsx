// Function to save a profile picture to IndexedDB
export const saveProfilePictureToIndexedDB = (email, file) => {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database with an optional version parameter
    const openDatabase = (version = undefined) =>
      indexedDB.open("ProfileDB", version);

    // Function to create or upgrade the database and object store
    const createOrUpgradeStore = (currentVersion) => {
      const newVersion = currentVersion + 1; // Increment the database version
      const upgradeRequest = openDatabase(newVersion);

      // Handle upgrade event to create the object store if it doesn't exist
      upgradeRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("ProfilePictures")) {
          db.createObjectStore("ProfilePictures", { keyPath: "email" });
          console.log("Object store 'ProfilePictures' created during upgrade.");
        }
      };

      // On successful upgrade, save the picture to the store
      upgradeRequest.onsuccess = (event) => {
        console.log("Database upgraded successfully.");
        saveToStore(event.target.result);
      };

      // Handle errors during the upgrade process
      upgradeRequest.onerror = (event) => reject(event.target.error);
    };

    // Function to save the picture to the object store
    const saveToStore = (db) => {
      const reader = new FileReader();

      // On successful file read, store the picture in the object store
      reader.onload = () => {
        const transaction = db.transaction("ProfilePictures", "readwrite");
        const store = transaction.objectStore("ProfilePictures");
        const data = { email, picture: reader.result };

        const putRequest = store.put(data);

        putRequest.onsuccess = () => {
          console.log("Picture saved successfully.");
          resolve();
        };

        putRequest.onerror = () => reject(putRequest.error);
      };

      // Handle file read errors
      reader.onerror = () => reject(reader.error);

      // Read the file as a data URL
      reader.readAsDataURL(file);
    };

    // Initial request to open the database
    const initialRequest = openDatabase();

    // Handle database creation or initial upgrade
    initialRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        db.createObjectStore("ProfilePictures", { keyPath: "email" });
        console.log(
          "Object store 'ProfilePictures' created during initial upgrade."
        );
      }
    };

    // Handle successful database opening
    initialRequest.onsuccess = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.log(
          "Object store 'ProfilePictures' not found. Upgrading database..."
        );
        db.close();
        createOrUpgradeStore(db.version); // Upgrade the database
      } else {
        saveToStore(db); // Save the picture if the store exists
      }
    };

    // Handle errors during the initial request
    initialRequest.onerror = (event) => reject(event.target.error);
  });
};

// Function to retrieve a profile picture from IndexedDB
export const getProfilePictureFromIndexedDB = (email) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProfileDB");

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Ensure the object store exists
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.error("Object store 'ProfilePictures' not found!");
        return reject(
          new Error("Object store 'ProfilePictures' does not exist.")
        );
      }

      // Retrieve the profile picture for the given email
      const transaction = db.transaction("ProfilePictures", "readonly");
      const store = transaction.objectStore("ProfilePictures");
      const getRequest = store.get(email);

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          resolve(getRequest.result.picture); // Return the picture
        } else {
          resolve(null); // Return null if no picture is found
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    };

    // Handle errors during database opening
    request.onerror = (event) => reject(event.target.error);
  });
};

// Function to delete a profile picture from IndexedDB
export const deleteProfilePictureFromIndexedDB = (email) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProfileDB", 2);

    request.onsuccess = (event) => {
      const db = event.target.result;

      // Ensure the object store exists
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.error("Object store 'ProfilePictures' not found!");
        return reject(
          new Error("Object store 'ProfilePictures' does not exist.")
        );
      }

      // Delete the profile picture for the given email
      const transaction = db.transaction("ProfilePictures", "readwrite");
      const store = transaction.objectStore("ProfilePictures");

      const deleteRequest = store.delete(email);

      deleteRequest.onsuccess = () => {
        console.log("Profile picture deleted successfully.");
        resolve();
      };

      // Handle errors during the deletion process
      deleteRequest.onerror = (event) => {
        console.error("Error deleting profile picture:", event.target.error);
        reject(event.target.error);
      };
    };

    // Handle errors during database opening
    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event.target.error);
      reject(event.target.error);
    };
  });
};
