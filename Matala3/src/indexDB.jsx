export const saveProfilePictureToIndexedDB = (email, file) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProfileDB", 2);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("ProfilePictures")) {
        db.createObjectStore("ProfilePictures", { keyPath: "email" });
        console.log("Object store 'ProfilePictures' created.");
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("ProfilePictures")) {
        console.error("Object store 'ProfilePictures' not found!");
        return reject(
          new Error("Object store 'ProfilePictures' does not exist.")
        );
      }

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

      // Start reading the file
      reader.readAsDataURL(file);
    };

    request.onerror = (event) => reject(event.target.error);
  });
};

export const getProfilePictureFromIndexedDB = (email) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProfileDB", 2);

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
