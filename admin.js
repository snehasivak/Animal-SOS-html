// Fetch and display rescue requests
async function loadRescueRequests() {
    const rescueRequestsList = document.getElementById('rescueRequestsList');
    rescueRequestsList.innerHTML = '';

    const snapshot = await db.collection('rescueRequests')
        .where('status', '==', 'pending')
        .get();

    snapshot.forEach(doc => {
        const request = doc.data();
        const requestElement = document.createElement('div');
        requestElement.innerHTML = `
            <img src="${request.photoURL}" alt="Animal Photo">
            <p>Location: ${request.location}</p>
            <p>Description: ${request.description}</p>
            <button onclick="acceptRescue('${doc.id}')">Accept Rescue</button>
        `;
        rescueRequestsList.appendChild(requestElement);
    });
}

// Fetch and display rescued animals for treatment
async function loadRescuedAnimals() {
    const rescuedAnimalsList = document.getElementById('rescuedAnimalsList');
    rescuedAnimalsList.innerHTML = '';

    const snapshot = await db.collection('rescueRequests')
        .where('status', '==', 'rescued')
        .get();

    snapshot.forEach(doc => {
        const animal = doc.data();
        const animalElement = document.createElement('div');
        animalElement.innerHTML = `
            <img src="${animal.photoURL}" alt="Animal Photo">
            <p>Location: ${animal.location}</p>
            <button onclick="markAsTreated('${doc.id}')">Mark as Treated</button>
        `;
        rescuedAnimalsList.appendChild(animalElement);
    });
}

async function acceptRescue(docId) {
    await db.collection('rescueRequests').doc(docId).update({
        status: 'rescued'
    });
    loadRescueRequests();
    loadRescuedAnimals();
}

async function markAsTreated(docId) {
    await db.collection('rescueRequests').doc(docId).update({
        status: 'treated'
    });
    loadRescuedAnimals();
}

// Load data when admin page loads
document.addEventListener('DOMContentLoaded', () => {
    loadRescueRequests();
    loadRescuedAnimals();
});