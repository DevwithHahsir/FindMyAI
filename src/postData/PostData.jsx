/* eslint-disable no-unused-vars */
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import categories from "../Data/category";
import tools from "../Data/tool";

import React, { useState, useEffect } from "react";

function PostData() {
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const checkAndAddData = async () => {
      setIsLoading(true);
      try {
        // Check if categories already exist
        const categoriesRef = collection(db, "categories");
        const categoriesSnapshot = await getDocs(categoriesRef);
        if (categoriesSnapshot.empty) {
          // Add categories if none exist
          for (let cat of categories) {
            await addDoc(collection(db, "categories"), cat);
          }
          console.log("Categories added successfully!");
        } else {
          console.log("Categories already exist in database.");
        }

        // Check if tools already exist
        const toolsRef = collection(db, "tools");
        const toolsSnapshot = await getDocs(toolsRef);
        if (toolsSnapshot.empty) {
          // Add tools if none exist
          for (let tool of tools) {
            // Create a serializable version of the tool without the icon React component
            const serializableTool = { ...tool };
            // Remove the icon property which contains a React component that can't be serialized
            delete serializableTool.icon;

            // Add the serializable version to Firestore
            try {
              await addDoc(collection(db, "tools"), serializableTool);
            } catch (error) {
              console.error("Error adding tool:", tool.name, error);
            }
          }
          console.log("Tools added successfully!");
        } else {
          console.log("Tools already exist in database.");
        }
      } catch (error) {
        console.error("Error processing data: ", error);
      } finally {
        setIsLoading(false);
        setIsComplete(true);
      }
    };

    checkAndAddData();
  }, []);

  return (
    <div>
      {isLoading
        ? "Loading..."
        : isComplete
        ? "Data processing complete!"
        : null}
    </div>
  );
}

export default PostData;
