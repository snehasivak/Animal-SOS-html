document.getElementById('rescueForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('animalLocation').value;
    const photoFile = document.getElementById('animalPhoto').files[0];
    const description = document.getElementById('animalDescription').value;

    try {
        // Upload photo to Firebase Storage
        const storageRef = storage.ref(`rescue-photos/${photoFile.name}`);
        await storageRef.put(photoFile);
        const photoURL = await storageRef.getDownloadURL();

        // Save rescue request to Firestore
        await db.collection('rescueRequests').add({
            location,
            description,
            photoURL,
            status: 'pending',
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Rescue request submitted successfully!');
        document.getElementById('rescueForm').reset();
    } catch (error) {
        console.error('Error submitting rescue request:', error);
        alert('Failed to submit rescue request');
    }
});