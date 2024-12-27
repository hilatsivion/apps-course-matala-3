export const saveProfilePictureToIndexedDB = (email, file) => {
  return new Promise((resolve, reject) => {
    const openDatabase = (version = undefined) => indexedDB.open("ProfileDB", version);

    const createOrUpgradeStore = (currentVersion) => {
      const newVersion = currentVersion + 1;
      const upgradeRequest = openDatabase(newVersion);

      upgradeRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("ProfilePictures")) {
          db.createObjectStore("ProfilePictures", { keyPath: "email" });
          console.log("Object store 'ProfilePictures' created during upgrade.");
        }
      };

      upgradeRequest.onsuccess = (event) => {
        console.log("Database upgraded successfully.");
        saveToStore(event.target.result);
      };

      upgradeRequest.onerror = (event) => reject(event.target.error);
    };

    const saveToStore = (db) => {
      const reader = new FileReader();

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

      reader.onerror = () => reject(reader.error);

      reader.readAsDataURL(file);
    };

    const initialRequest = openDatabase();

    initialRequest.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        db.createObjectStore("ProfilePictures", { keyPath: "email" });
        console.log("Object store 'ProfilePictures' created during initial upgrade.");
      }
    };

    initialRequest.onsuccess = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.log("Object store 'ProfilePictures' not found. Upgrading database...");
        db.close();
        createOrUpgradeStore(db.version);
      } else {
        saveToStore(db);
      }
    };

    initialRequest.onerror = (event) => reject(event.target.error);
  });
};

export const getProfilePictureFromIndexedDB = (email) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProfileDB");

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.error("Object store 'ProfilePictures' not found!");
        return reject(
          new Error("Object store 'ProfilePictures' does not exist.")
        );
      }

      const transaction = db.transaction("ProfilePictures", "readonly");
      const store = transaction.objectStore("ProfilePictures");
      const getRequest = store.get(email);

      getRequest.onsuccess = () => {
        if (getRequest.result) {
          resolve(getRequest.result.picture);
        } else {
          resolve(null);
        }
      };

      getRequest.onerror = () => reject(getRequest.error);
    };

    request.onerror = (event) => reject(event.target.error);
  });
};
